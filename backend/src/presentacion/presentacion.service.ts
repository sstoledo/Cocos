import { Injectable } from '@nestjs/common';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';

@Injectable()
export class PresentacionService {
  create(createPresentacionDto: CreatePresentacionDto) {
    return 'This action adds a new presentacion';
  }

  findAll() {
    return `This action returns all presentacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentacion`;
  }

  update(id: number, updatePresentacionDto: UpdatePresentacionDto) {
    return `This action updates a #${id} presentacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentacion`;
  }
}
