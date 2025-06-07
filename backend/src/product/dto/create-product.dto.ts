import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El código del producto es obligatorio' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'El ID del proveedor es obligatorio' })
  idProvider: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio' })
  idCategory: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID de la presentación es obligatorio' })
  idPresentacion: string;

  @IsString()
  @IsOptional()
  publicId: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
