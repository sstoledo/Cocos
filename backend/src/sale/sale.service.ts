import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  @InjectRepository(Sale)
  private readonly saleRepository: Repository<Sale>;
  async create(createSaleDto: CreateSaleDto) {
    //instanciamos un objeto nuevo
    const newSale = this.saleRepository.create(createSaleDto);
    //guardamos en la base de datos
    try {
      await this.saleRepository.save(newSale);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return { message: 'Sale created successfully', newSale };
  }

  async findAll() {
    //traemos todos los activos
    const sales = await this.saleRepository.find({
      where: {
        isActive: true,
      },
    });
    return sales;
  }

  async findOne(id: string) {
    //buscamos la venta
    const sale = await this.saleRepository.findOne({
      where: { id },
    });
    //validamos que exista la venta
    if (!sale) {
      throw new Error('La venta no existe');
    }
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    //buscamos la venta
    const sale = await this.saleRepository.findOne({
      where: { id },
    });
    //validamos que exista la venta
    if (!sale) {
      throw new Error('La venta no existe');
    }
    //actualizamos la venta directamente con los campos proporcionados
    Object.assign(sale, updateSaleDto);
    //guardamos en la base de datos
    try {
      await this.saleRepository.save(sale);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return { message: 'Sale updated successfully', sale };
  }

  async remove(id: string) {
    //buscamos la venta
    const sale = await this.saleRepository.findOne({
      where: { id },
    });
    //validamos que exista la venta
    if (!sale) {
      throw new Error('La venta no existe');
    }
    //asignamos el nuevo valor de isActive
    sale.isActive = false;
    //guardamos en la base de datos
    try {
      await this.saleRepository.save(sale);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return 'Sale eliminado correctamente';
  }
}
