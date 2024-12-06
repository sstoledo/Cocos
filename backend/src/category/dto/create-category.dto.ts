import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  father: string; // Aquí se refiere al id del padre como string para enviar la relación

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
