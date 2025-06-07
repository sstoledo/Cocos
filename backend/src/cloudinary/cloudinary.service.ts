import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import { UploadOptionsDto } from './dto/upload-options.dto';
import { CloudinaryResponse } from './interfaces/cloudinary-response-interface';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.v2.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUD_API_SECRET'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    options?: UploadOptionsDto
  ): Promise<CloudinaryResponse> {
    try {
      if (!file) {
        throw new BadRequestException('No file provided');
      }

      const uploadOptions: cloudinary.UploadApiOptions = {
        resource_type: 'auto', // Changed to auto for better file type handling
        ...options,
      };

      const result = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        const upload = cloudinary.v2.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        // Add error handling for the stream
        upload.on('error', (error) => {
          reject(new InternalServerErrorException(`Upload stream error: ${error.message}`));
        });

        Readable.from(file.buffer).pipe(upload);
      });

      return result as CloudinaryResponse;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      this.handleCloudinaryError(error);
    }
  }

  async updateImage(
    publicId: string,
    file: Express.Multer.File,
    options?: UploadOptionsDto
  ): Promise<CloudinaryResponse> {
    try {
      // Verificar si la imagen existe antes de actualizar
      const exists = await this.checkImageExists(publicId);
      if (!exists) {
        throw new BadRequestException(`No se encontró una imagen con el ID: ${publicId}`);
      }

      // Eliminar la imagen existente
      await this.deleteImage(publicId);

      // Subir la nueva imagen
      return await this.uploadImage(file, options);
    } catch (error) {
      this.handleCloudinaryError(error);
    }
  }

  async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId);

      if (result.result !== 'ok') {
        throw new BadRequestException('No se pudo eliminar la imagen');
      }

      return { result: 'ok' };
    } catch (error) {
      this.handleCloudinaryError(error);
    }
  }

  private async checkImageExists(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.v2.api.resource(publicId);
      return !!result;
    } catch (error) {
      return false;
    }
  }

  private handleCloudinaryError(error: any) {
    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error.http_code === 400) {
      throw new BadRequestException(error.message);
    }

    if (error.http_code === 401) {
      throw new BadRequestException('Error de autenticación con Cloudinary');
    }

    throw new InternalServerErrorException(
      `Error en el servicio de Cloudinary: ${error.message}`
    );
  }
}