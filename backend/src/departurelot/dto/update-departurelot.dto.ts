import { PartialType } from '@nestjs/mapped-types';
import { CreateDeparturelotDto } from './create-departurelot.dto';

export class UpdateDeparturelotDto extends PartialType(CreateDeparturelotDto) {}
