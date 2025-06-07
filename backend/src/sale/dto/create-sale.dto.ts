import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateSaleDto {

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de venta es obligatorio' })
  date: Date;

  @IsString()
  @IsNotEmpty({ message: 'El total de venta es obligatorio' })
  idClient: string;

  @IsNumber()
  @IsPositive({ message: 'El total de venta debe ser un número positivo' })
  @IsNotEmpty({ message: 'El total de venta es obligatorio' })
  total: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

}
