import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  fatherId: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
