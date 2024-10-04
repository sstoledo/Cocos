import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import { Express } from 'express-serve-static-core';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<cloudinary.UploadApiResponse> {
    try {
      return await new Promise((resolve, reject) => {
        const upload = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        // Convertir el buffer del archivo a un stream legible
        Readable.from(file.buffer).pipe(upload);
      });
    } catch (error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }
  }

  async updateImage(publicId: string, file: Express.Multer.File): Promise<cloudinary.UploadApiResponse> {
    try {
      // Primero, eliminamos la imagen existente
      await this.deleteImage(publicId);

      // Luego, subimos la nueva imagen
      return await this.uploadImage(file);
    } catch (error) {
      throw new Error(`Error al actualizar imagen: ${error.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<cloudinary.DeleteApiResponse> {
    try {
      return await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Error al eliminar imagen: ${error.message}`);
    }
  }
}