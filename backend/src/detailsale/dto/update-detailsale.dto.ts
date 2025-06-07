import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsaleDto } from './create-detailsale.dto';

export class UpdateDetailsaleDto extends PartialType(CreateDetailsaleDto) {}
