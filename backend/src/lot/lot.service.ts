import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LotService {
  @InjectRepository(Lot)
  private readonly lotRepository: Repository<Lot>;
  async create(createLotDto: CreateLotDto) {
    //instanciamos un objeto nuevo
    const newLot = await this.lotRepository.create(createLotDto);
    //guardamos en la base de datos
    try {
      await this.lotRepository.save(newLot);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el lot' + error);
    }
    return { message: 'Lot created successfully', newLot };
  }

  async findAll() {
    //traemos todos los activos
    const lots = await this.lotRepository.find({
      where: {
        isActive: true
      },
      relations: ['parentProduct']
    });

    const lotsMaped = lots.map(lot => {
      return {
        id: lot.id,
        nameProduct: lot.parentProduct.name,
        quantity: lot.quantity,
        dateEntry: lot.dateEntry,
      }
    })
    return lotsMaped;
  }

  async findOne(id: string) {
    //buscamos el lot
    const lot = await this.lotRepository.findOne({
      where: { id }
    });
    //validamos que exista el lot
    if (!lot) {
      throw new BadRequestException('El lot no existe');
    }
    return {
      id: lot.id,
      codeProduct: lot.codeProduct,
      quantity: lot.quantity,
      dateEntry: lot.dateEntry,
      priceBuy: lot.priceBuy,
      priceLot: lot.priceLot,
    }
  }

  async update(id: string, updateLotDto: UpdateLotDto) {
    //buscamos el lot
    const lot = await this.lotRepository.findOne({
      where: { id }
    });
    //validamos que exista el lot
    if (!lot) {
      throw new BadRequestException('El lot no existe');
    }
    //actualizamos el lot directamente con los campos proporcionados
    Object.assign(lot, updateLotDto);
    //guardamos en la base de datos
    try {
      await this.lotRepository.save(lot);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el lot');
    }
    return { message: 'Lot updated successfully', lot };
  }

  async remove(id: string) {
    //buscamos el lot
    const lot = await this.lotRepository.findOne({
      where: { id }
    });
    //validamos que exista el lot
    if (!lot) {
      throw new BadRequestException('El lot no existe');
    }
    //asignamos el nuevo valor de isActive
    lot.isActive = false;
    //guardamos en la base de datos
    try {
      await this.lotRepository.save(lot);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el lot');
    }
    return 'Lot eliminado correctamente';
  }
}
