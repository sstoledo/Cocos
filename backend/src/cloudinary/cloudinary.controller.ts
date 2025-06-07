import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';
import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadOptionsDto } from './dto/upload-options.dto';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cloudinary')
@UseGuards(JwtAuthGuard, UserRoleGuard)
@Auth(ValidRoles.admin)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Body() options?: UploadOptionsDto,
  ) {
    const result = await this.cloudinaryService.uploadImage(file, options);
    return {
      success: true,
      message: 'Imagen subida exitosamente',
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    };
  }

  @Put('update/:publicId')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('publicId') publicId: string,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Body() options?: UploadOptionsDto,
  ) {
    const result = await this.cloudinaryService.updateImage(
      publicId,
      file,
      options,
    );
    return {
      message: 'Imagen actualizada exitosamente',
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    };
  }

  @Delete('delete/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    await this.cloudinaryService.deleteImage(publicId);
    return {
      message: 'Imagen eliminada exitosamente',
    };
  }
}
