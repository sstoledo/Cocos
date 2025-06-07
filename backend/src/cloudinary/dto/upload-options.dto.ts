import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { CloudinaryResourceType } from '../interfaces/cloudinary-config.interface';

export class UploadOptionsDto {
  @IsOptional()
  @IsString()
  folder?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  crop?: string;

  @IsOptional()
  @IsEnum(['raw', 'image', 'video', 'auto'])
  resource_type?: CloudinaryResourceType;
}
