import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateClienteDto {

  @IsString()
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido paterno del cliente es obligatorio' })
  apat: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido materno del cliente es obligatorio' })
  amat: string;

  @IsString()
  @MaxLength(8, { message: 'El DNI debe tener 8 caracteres' })
  dni: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

}
