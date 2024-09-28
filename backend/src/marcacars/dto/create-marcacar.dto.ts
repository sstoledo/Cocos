import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMarcacarDto {

  @IsString()
  @IsNotEmpty({ message: 'El nombre del marca es obligatorio' })
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
