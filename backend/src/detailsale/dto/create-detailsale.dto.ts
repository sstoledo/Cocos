import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateDetailsaleDto {

  @IsString()
  @IsNotEmpty({ message: 'El ID de la venta es obligatorio' })
  idSale: string;

  @IsString()
  @IsNotEmpty({ message: 'El código del producto es obligatorio' })
  codeProduct: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad de producto es obligatorio' })
  @IsPositive({ message: 'La cantidad de producto es obligatorio' })º
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  @IsPositive({ message: 'El precio unitario es obligatorio' })
  priceUnit: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

}
