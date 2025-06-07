import { IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsOptional()
  @IsUUID()
  fatherId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
