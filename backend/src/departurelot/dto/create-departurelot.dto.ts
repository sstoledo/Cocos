import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDeparturelotDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID del lote es obligatorio' })
  idLot: string;

  @IsString()
  @IsNotEmpty({ message: 'El ID del detalle de venta es obligatorio' })
  idDetailSale: string;

  @IsNumber()
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  quantity: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
