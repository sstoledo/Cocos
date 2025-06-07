import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDetailsaleDto } from './dto/create-detailsale.dto';
import { UpdateDetailsaleDto } from './dto/update-detailsale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailSale } from './entities/detailsale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsaleService {
  @InjectRepository(DetailSale)
  private readonly detailSaleRepository: Repository<DetailSale>;
  async create(createDetailsaleDto: CreateDetailsaleDto) {
    //creamos la instancia
    const newDetailSale = await this.detailSaleRepository.create(createDetailsaleDto);
    //guardamos en la base de datos
    try {
      await this.detailSaleRepository.save(newDetailSale);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la detailsale');
    }
    return { message: 'Detailsale created successfully', newDetailSale };
  }

  async findAll() {
    //traemos todos los activos
    const detailSales = await this.detailSaleRepository.find({
      where: {
        isActive: true
      }
    });
    return detailSales;
  }

  async findOne(id: string) {
    //buscamos el detailSale
    const detailSale = await this.detailSaleRepository.findOne({
      where: { id }
    });
    //validamos que exista el detailSale
    if (!detailSale) {
      throw new Error('El detailSale no existe');
    }
    return detailSale;
  }

  async update(id: string, updateDetailsaleDto: UpdateDetailsaleDto) {
    //buscamos el detailSale
    const detailSale = await this.detailSaleRepository.findOne({
      where: { id }
    });
    //validamos que exista el detailSale
    if (!detailSale) {
      throw new Error('El detailSale no existe');
    }
    //actualizamos el detailSale directamente con los campos proporcionados
    Object.assign(detailSale, updateDetailsaleDto);
    //guardamos en la base de datos
    try {
      await this.detailSaleRepository.save(detailSale);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el detailSale');
    }
    return { message: 'Detailsale updated successfully', detailSale };
  }

  async remove(id: string) {
    //buscamos el detailSale
    const detailSale = await this.detailSaleRepository.findOne({
      where: { id }
    });
    //validamos que exista el detailSale
    if (!detailSale) {
      throw new Error('El detailSale no existe');
    }
    //asignamos el nuevo valor de isActive
    detailSale.isActive = false;
    //guardamos en la base de datos
    try {
      await this.detailSaleRepository.save(detailSale);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el detailSale');
    }
    return 'Detailsale eliminado correctamente';
  }
}
