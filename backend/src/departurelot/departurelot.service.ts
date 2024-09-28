import { Injectable } from '@nestjs/common';
import { CreateDeparturelotDto } from './dto/create-departurelot.dto';
import { UpdateDeparturelotDto } from './dto/update-departurelot.dto';

@Injectable()
export class DeparturelotService {
  create(createDeparturelotDto: CreateDeparturelotDto) {
    return 'This action adds a new departurelot';
  }

  findAll() {
    return `This action returns all departurelot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departurelot`;
  }

  update(id: number, updateDeparturelotDto: UpdateDeparturelotDto) {
    return `This action updates a #${id} departurelot`;
  }

  remove(id: number) {
    return `This action removes a #${id} departurelot`;
  }
}
