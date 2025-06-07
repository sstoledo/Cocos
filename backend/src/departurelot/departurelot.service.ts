import { Injectable } from '@nestjs/common';
import { CreateDeparturelotDto } from './dto/create-departurelot.dto';
import { UpdateDeparturelotDto } from './dto/update-departurelot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartureLot } from './entities/departurelot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeparturelotService {
  @InjectRepository(DepartureLot)
  private readonly departurelotRepository: Repository<DepartureLot>;
  create(createDeparturelotDto: CreateDeparturelotDto) {
    //instanciamos un objeto nuevo
    const newDeparturelot = this.departurelotRepository.create(createDeparturelotDto);
    //guardamos en la base de datos
    this.departurelotRepository.save(newDeparturelot);
    return { message: 'Departurelot created successfully', newDeparturelot };
  }

  async findAll() {
    const departurelots = await this.departurelotRepository.find({
      where: {
        isActive: true
      }
    });
    return departurelots;
  }

  findOne(id: string) {
    //buscamos el departurelot
    const departurelot = this.departurelotRepository.findOne({
      where: { id }
    });
    //validamos que exista el departurelot
    if (!departurelot) {
      throw new Error('El departurelot no existe');
    }
    return departurelot;
  }

  async update(id: string, updateDeparturelotDto: UpdateDeparturelotDto) {
    //buscamos el departurelot
    const departurelot = await this.departurelotRepository.findOne({
      where: { id }
    });
    //validamos que exista el departurelot
    if (!departurelot) {
      throw new Error('El departurelot no existe');
    }
    //actualizamos el departurelot directamente con los campos proporcionados
    Object.assign(departurelot, updateDeparturelotDto);
    //guardamos en la base de datos
    await this.departurelotRepository.save(departurelot);
    return { message: 'Departurelot updated successfully', departurelot };
  }

  async remove(id: string) {
    //buscamos el departurelot
    const departurelot = await this.departurelotRepository.findOne({
      where: { id }
    });
    //validamos que exista el departurelot
    if (!departurelot) {
      throw new Error('El departurelot no existe');
    }
    //asignamos el nuevo valor de isActive
    departurelot.isActive = false;
    //guardamos en la base de datos
    await this.departurelotRepository.save(departurelot);
    return 'Departurelot eliminado correctamente';
  }
}
