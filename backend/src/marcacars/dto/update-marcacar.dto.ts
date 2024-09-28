import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcacarDto } from './create-marcacar.dto';

export class UpdateMarcacarDto extends PartialType(CreateMarcacarDto) {}
