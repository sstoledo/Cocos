import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAutomovilDto } from './dto/create-automovil.dto';
import { UpdateAutomovilDto } from './dto/update-automovil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Automovil } from './entities/automovil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutomovilService {
  @InjectRepository(Automovil)
  private readonly automovilRepository: Repository<Automovil>;

  async create(createAutomovilDto: CreateAutomovilDto) {
    const newAuto = await this.automovilRepository.create(createAutomovilDto);

    try {
      await this.automovilRepository.save(newAuto);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el automovil ' + error);
    }

    return { message: 'Automovil creado', automovil: newAuto };
  }

  async findAll() {
    const automovils = await this.automovilRepository.find({
      where: {
        isActive: true
      },
      relations: ['parent', 'client']
    });

    const automovilsMaped = automovils.map(auto => {
      return {
        id: auto.id,
        matricula: auto.matricula,
        kilometraje: auto.kilometraje,
        idMarca: auto.idMarca,
        modelo: auto.modelo,
        clientId: auto.client.id,
        nameClient: auto.client.name,
        nameMarca: auto.parent.name,
      }
    })
    
    return automovilsMaped;
  }

  async findOne(id: string) {
    const automovil = await this.automovilRepository.findOne({
      where: { id }
    });

    if (!automovil) {
      throw new Error('El automovil no existe');
    }
    return {
      id: automovil.id,
      matricula: automovil.matricula,
      kilometraje: automovil.kilometraje,
      idMarca: automovil.idMarca,
      modelo: automovil.modelo,
      clientId: automovil.clientId,
    }
  }

  async update(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    const automovil = await this.automovilRepository.findOne({
      where: { id }
    });

    if (!automovil) {
      throw new BadRequestException('El automovil no existe');
    }

    Object.assign(automovil, updateAutomovilDto);

    try {
      await this.automovilRepository.save(automovil);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el automovil');
    }

    return {
      message: 'El automovil fue actualizado correctamente',
      automovil
    };
  }

  async remove(id: string) {
    const automovil = await this.automovilRepository.findOne({
      where: { id }
    });

    if (!automovil) {
      throw new BadRequestException('El automovil no existe');
    };

    automovil.isActive = false;

    try {
      await this.automovilRepository.save(automovil);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el automovil');
    }

    return 'El automovil fue eliminado correctamente';
  }
}
