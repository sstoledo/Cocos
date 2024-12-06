import { Injectable } from '@nestjs/common';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PresentacionService {
  @InjectRepository(Presentacion)
  private readonly presentacionRepository: Repository<Presentacion>;
  async create(createPresentacionDto: CreatePresentacionDto) {
    //creamos la instancia
    const newPresentacion = await this.presentacionRepository.create(createPresentacionDto);
    //guardamos en la base de datos
    try {
      await this.presentacionRepository.save(newPresentacion);
    } catch (error) {
      throw new Error('Error al crear la presentacion');
    }
    return { message: 'Presentacion created successfully', newPresentacion };
  }

  async allPresentacions() {
    //traemos todos los activos
    const presentacions = await this.presentacionRepository.find({
      where: {
        isActive: true
      },
      select: ['id', 'name']
    });
    return presentacions;
  }

  async findAll() {
    //traemos todos los activos
    const presentacions = await this.presentacionRepository.find({
      where: {
        isActive: true
      }
    });
    return presentacions;
  }

  async findOne(id: string) {
    //buscamos la presentacion
    const presentacion = await this.presentacionRepository.findOne({
      where: { id },
      select: ['id', 'name']
    });
    //validamos que exista la presentacion
    if (!presentacion) {
      throw new Error('La presentacion no existe');
    }
    return presentacion;
  }

  async update(id: string, updatePresentacionDto: UpdatePresentacionDto) {
    //buscamos la presentacion
    const presentacion = await this.presentacionRepository.findOne({
      where: { id }
    });
    //validamos que exista la presentacion
    if (!presentacion) {
      throw new Error('La presentacion no existe');
    }
    //actualizamos la presentacion directamente con los campos proporcionados
    Object.assign(presentacion, updatePresentacionDto);
    //guardamos en la base de datos
    try {
      await this.presentacionRepository.save(presentacion);
    } catch (error) {
      throw new Error('Error al actualizar la presentacion');
    }
    return { message: 'Presentacion updated successfully', presentacion };
  }

  async remove(id: string) {
    //buscamos la presentacion
    const presentacion = await this.presentacionRepository.findOne({
      where: { id }
    });
    //validamos que exista la presentacion
    if (!presentacion) {
      throw new Error('La presentacion no existe');
    }
    //asignamos el nuevo valor de isActive
    presentacion.isActive = false;
    //guardamos en la base de datos
    try {
      await this.presentacionRepository.save(presentacion);
    } catch (error) {
      throw new Error('Error al eliminar la presentacion');
    }
    return 'Presentacion eliminado correctamente';
  }
}
