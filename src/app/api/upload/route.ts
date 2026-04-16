import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'drds7n7gi',
  api_key: '979836697357783',
  api_secret: '3tWGw-EIqi9PUeOZ-El6GNIIqRM',
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('Received file:', file?.name, file?.type, file?.size);
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Verify file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64
    const base64String = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${base64String}`;

    console.log('Uploading to Cloudinary...');

    // Upload to Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(dataUri, {
        folder: 'portfolio',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:best' }
        ]
      }, (err, res) => {
        if (err) {
          console.error('Cloudinary error:', err);
          reject(err);
        } else {
          console.log('Cloudinary success:', res?.secure_url);
          resolve(res);
        }
      });
    });

    if (!result || !result.secure_url) {
      console.error('No URL returned from Cloudinary');
      return NextResponse.json({ error: 'Upload failed - no URL returned' }, { status: 500 });
    }

    console.log('Returning URL:', result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}