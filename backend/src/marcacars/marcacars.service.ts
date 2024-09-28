import { Injectable } from '@nestjs/common';
import { CreateMarcacarDto } from './dto/create-marcacar.dto';
import { UpdateMarcacarDto } from './dto/update-marcacar.dto';

@Injectable()
export class MarcacarsService {
  create(createMarcacarDto: CreateMarcacarDto) {
    return 'This action adds a new marcacar';
  }

  findAll() {
    return `This action returns all marcacars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marcacar`;
  }

  update(id: number, updateMarcacarDto: UpdateMarcacarDto) {
    return `This action updates a #${id} marcacar`;
  }

  remove(id: number) {
    return `This action removes a #${id} marcacar`;
  }
}
