import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

// Helper to strip quotes if they are present in environment variables
const cleanEnvVar = (val: string | undefined) => {
  if (!val) return val;
  return val.replace(/^["']|["']$/g, '');
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const cloudName = cleanEnvVar(process.env.CLOUDINARY_CLOUD_NAME);
  const apiKey = cleanEnvVar(process.env.CLOUDINARY_API_KEY);
  const apiSecret = cleanEnvVar(process.env.CLOUDINARY_API_SECRET);

  try {
    if (!cloudName || !apiKey || !apiSecret) {
      const missing = [];
      if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME');
      if (!apiKey) missing.push('CLOUDINARY_API_KEY');
      if (!apiSecret) missing.push('CLOUDINARY_API_SECRET');
      
      console.error('Cloudinary configuration error: Missing', missing.join(', '));
      
      return NextResponse.json(
        { 
          error: 'Cloudinary is not configured correctly.',
          details: `Missing environment variables: ${missing.join(', ')}. Please check your .env.local file.`
        },
        { status: 500 }
      );
    }

    // Configure cloudinary inside the handler to ensure it uses the latest env vars
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${base64String}`;

    console.log('Uploading image to Cloudinary folder: portfolio');

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(dataUri, {
        folder: 'portfolio',
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:best' }
        ]
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    if (!result?.secure_url) {
      return NextResponse.json({ error: 'Upload failed - no URL returned from Cloudinary' }, { status: 500 });
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}