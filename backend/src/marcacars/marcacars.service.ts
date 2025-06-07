import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMarcacarDto } from './dto/create-marcacar.dto';
import { UpdateMarcacarDto } from './dto/update-marcacar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaCars } from './entities/marcacar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcacarsService {
  @InjectRepository(MarcaCars)
  private readonly marcacarRepository: Repository<MarcaCars>;

  async create(createMarcacarDto: CreateMarcacarDto) {
    //instanciamos un objeto nuevo
    const newMarcacar = this.marcacarRepository.create(createMarcacarDto);
    //guardamos en la base de datos
    try {
      await this.marcacarRepository.save(newMarcacar);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return { message: 'Marcacar created successfully', newMarcacar };
  }

  async allMarcacars() {
    //traemos todos los activos
    const marcacars = await this.marcacarRepository.find({
      where: {
        isActive: true,
      },
      select: ['id', 'name'],
    });

    return marcacars;
  }

  async findAll() {
    //traemos todos los activos
    const marcacars = await this.marcacarRepository.find({
      where: {
        isActive: true,
      },
    });

    return marcacars.map((marca) => ({
      id: marca.id,
      name: marca.name,
      isActive: marca.isActive,
    }));
  }

  async findOne(id: string) {
    //buscamos el marcacar
    const marcacar = await this.marcacarRepository.findOne({
      where: { id },
    });
    //validamos que exista el marcacar
    if (!marcacar) {
      throw new Error('El marcacar no existe');
    }
    return {
      id: marcacar.id,
      name: marcacar.name,
      isActive: marcacar.isActive,
    };
  }

  async update(id: string, updateMarcacarDto: UpdateMarcacarDto) {
    //buscamos el marcacar
    const marcacar = await this.marcacarRepository.findOne({
      where: { id },
    });
    //validamos que exista el marcacar
    if (!marcacar) {
      throw new Error('El marcacar no existe');
    }
    //actualizamos el marcacar directamente con los campos proporcionados
    Object.assign(marcacar, updateMarcacarDto);
    //guardamos en la base de datos
    try {
      await this.marcacarRepository.save(marcacar);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return { message: 'Marcacar updated successfully', marcacar };
  }

  async remove(id: string) {
    //buscamos el marcacar
    const marcacar = await this.marcacarRepository.findOne({
      where: { id },
    });
    //validamos que exista el marcacar
    if (!marcacar) {
      throw new Error('El marcacar no existe');
    }
    //actualizamos el isActive
    marcacar.isActive = false;
    //guardamos en la base de datos
    try {
      await this.marcacarRepository.save(marcacar);
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
    return 'Marcacar eliminado correctamente';
  }
}
