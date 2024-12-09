export interface UploadOptionsDto {
  folder?: string;
  width?: number;
  height?: number;
  crop?: string;
  resource_type?: CloudinaryResourceType;
}

export type CloudinaryResourceType = 'raw' | 'image' | 'video' | 'auto';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
}