import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAutomovilDto {
  @IsString()
  @IsNotEmpty({ message: 'El matricula es obligatorio' })
  matricula: string;

  @IsNumber()
  @IsPositive({ message: 'El kilometraje debe ser positivo' })
  kilometraje: number;

  @IsUUID()
  @IsNotEmpty({ message: 'El id del marca es obligatorio' })
  idMarca: string;

  @IsString()
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @IsUUID()
  @IsNotEmpty({ message: 'El id del cliente es obligatorio' })
  clientId: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
