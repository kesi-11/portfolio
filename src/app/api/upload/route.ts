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
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to base64
    const base64String = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(dataUri, {
        folder: 'portfolio',
        resource_type: 'image',
        eager: '',
      }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });

    if (!result || !result.secure_url) {
      return NextResponse.json({ error: 'Upload failed - no URL returned' }, { status: 500 });
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}