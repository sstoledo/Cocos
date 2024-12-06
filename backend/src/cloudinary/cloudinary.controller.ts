import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express-serve-static-core';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      return {
        message: 'Imagen subida exitosamente',
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      return {
        message: 'Error al subir la imagen',
        error: error.message,
      };
    }
  }

  @Put('update/:publicId')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('publicId') publicId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const result = await this.cloudinaryService.updateImage(publicId, file);
      return {
        message: 'Imagen actualizada exitosamente',
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      return {
        message: 'Error al actualizar la imagen',
        error: error.message,
      };
    }
  }

  @Delete('delete/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    try {
      await this.cloudinaryService.deleteImage(publicId);
      return {
        message: 'Imagen eliminada exitosamente',
      };
    } catch (error) {
      return {
        message: 'Error al eliminar la imagen',
        error: error.message,
      };
    }
  }
}
