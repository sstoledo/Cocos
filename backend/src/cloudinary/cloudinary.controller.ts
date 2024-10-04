import { Controller, Post, Put, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express-serve-static-core';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Put('update/:publicId')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(@Param('publicId') publicId: string, @UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.updateImage(publicId, file);
  }

  @Delete('delete/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    return this.cloudinaryService.deleteImage(publicId);
  }
}