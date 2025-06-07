import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProviderDto {

  @IsString()
  @IsNotEmpty({ message: 'El nombre del proveedor es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección del proveedor es obligatorio' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono del proveedor es obligatorio' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'El correo electrónico del proveedor es obligatorio' })
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
