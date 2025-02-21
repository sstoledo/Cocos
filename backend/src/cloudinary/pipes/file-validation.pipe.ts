import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FileValidationOptions } from '../interfaces/file-validation.interface';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private options: FileValidationOptions = {}) {
    this.options = {
      maxSize: 5 * 1024 * 1024, // 5MB por defecto
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
      ...options,
    };
  }

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo');
    }

    const { maxSize, allowedMimeTypes, allowedExtensions } = this.options;

    // Validar tamaño
    if (file.size > maxSize) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido de ${maxSize / 1024 / 1024}MB`
      );
    }

    // Validar tipo MIME
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido. Tipos permitidos: ${allowedMimeTypes.join(', ')}`
      );
    }

    // Validar extensión
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Extensión de archivo no permitida. Extensiones permitidas: ${allowedExtensions.join(', ')}`
      );
    }

    return file;
  }
}