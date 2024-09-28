import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateLotDto {

  @IsString()
  @IsNotEmpty({ message: 'El código del producto es obligatorio' })
  codeProduct: string;

  @IsNumber()
  @IsPositive({ message: 'La cantidad de producto debe ser un número positivo' })
  @IsNotEmpty({ message: 'La cantidad de producto es obligatorio' })
  quantity: number;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de entrada es obligatorio' })
  dateEntry: Date;

  @IsNumber()
  @IsPositive({ message: 'El precio de compra debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio de compra es obligatorio' })
  priceBuy: number;

  @IsNumber()
  @IsPositive({ message: 'El precio de venta debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio de venta es obligatorio' })
  priceLot: number;

  @IsString()
  @IsNotEmpty({ message: 'El ID del proveedor es obligatorio' })
  idProvider: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

}
