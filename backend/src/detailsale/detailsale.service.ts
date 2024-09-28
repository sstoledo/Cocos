import { Injectable } from '@nestjs/common';
import { CreateDetailsaleDto } from './dto/create-detailsale.dto';
import { UpdateDetailsaleDto } from './dto/update-detailsale.dto';

@Injectable()
export class DetailsaleService {
  create(createDetailsaleDto: CreateDetailsaleDto) {
    return 'This action adds a new detailsale';
  }

  findAll() {
    return `This action returns all detailsale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailsale`;
  }

  update(id: number, updateDetailsaleDto: UpdateDetailsaleDto) {
    return `This action updates a #${id} detailsale`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailsale`;
  }
}
