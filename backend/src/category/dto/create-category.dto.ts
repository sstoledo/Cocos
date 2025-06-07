import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @IsInt()
  @IsOptional()
  level: number;

  @IsOptional()
  @IsUUID()
  fatherId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
