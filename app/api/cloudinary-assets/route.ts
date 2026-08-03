import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryAsset } from '@/types/upload';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !cloudName) {
      return NextResponse.json({
        assets: [],
        warning: 'Cloudinary server credentials not fully configured in environment.',
      });
    }

    // Fetch images and videos in parallel
    const [imagesRes, videosRes] = await Promise.all([
      cloudinary.api.resources({
        type: 'upload',
        prefix: '',
        max_results: 100,
        resource_type: 'image',
      }).catch(() => ({ resources: [] })),

      cloudinary.api.resources({
        type: 'upload',
        prefix: '',
        max_results: 100,
        resource_type: 'video',
      }).catch(() => ({ resources: [] })),
    ]);

    const formattedImages: CloudinaryAsset[] = (imagesRes.resources || []).map((res: any) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      url: res.url,
      format: res.format || 'jpg',
      resource_type: 'image',
      bytes: res.bytes || 0,
      width: res.width,
      height: res.height,
      created_at: res.created_at || new Date().toISOString(),
      asset_id: res.asset_id,
      filename: res.public_id.split('/').pop(),
    }));

    const formattedVideos: CloudinaryAsset[] = (videosRes.resources || []).map((res: any) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      url: res.url,
      format: res.format || 'mp4',
      resource_type: 'video',
      bytes: res.bytes || 0,
      width: res.width,
      height: res.height,
      created_at: res.created_at || new Date().toISOString(),
      asset_id: res.asset_id,
      filename: res.public_id.split('/').pop(),
    }));

    const allAssets = [...formattedImages, ...formattedVideos].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ assets: allAssets });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch assets';
    return NextResponse.json({ assets: [], error: msg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { public_id, resource_type = 'image' } = await request.json();
    if (!public_id) {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 });
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (apiSecret) {
      await cloudinary.uploader.destroy(public_id, {
        resource_type: resource_type || 'image',
        invalidate: true,
      });
    }

    return NextResponse.json({ success: true, message: `Asset ${public_id} deleted` });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to delete asset';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
