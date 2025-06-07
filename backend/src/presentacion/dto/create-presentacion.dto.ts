import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePresentacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la presentación es obligatorio' })
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
