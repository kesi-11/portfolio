import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drds7n7gi',
  api_key: process.env.CLOUDINARY_API_KEY || '979836697357783',
  api_secret: process.env.CLOUDINARY_API_SECRET || '3tWGw-EIqi9PUeOZ-El6GNIIqRM',
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
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

    const result: any = await cloudinary.uploader.upload(dataUri, {
      folder: 'portfolio',
      resource_type: 'image',
      use_filename: true,
      unique_filename: true,
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:best' }
      ]
    });

    if (!result?.secure_url) {
      return NextResponse.json({ error: 'Upload failed - no URL returned' }, { status: 500 });
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}