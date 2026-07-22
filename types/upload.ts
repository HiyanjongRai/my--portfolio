export interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  resource_type: 'image' | 'video' | string;
  bytes: number;
  width?: number;
  height?: number;
  created_at: string;
  asset_id?: string;
  original_filename?: string;
  filename?: string;
}

export interface UploadStatsData {
  totalUploads: number;
  totalImages: number;
  totalVideos: number;
  totalStorageBytes: number;
}

export type FilterCategory = 'all' | 'image' | 'video';
export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
