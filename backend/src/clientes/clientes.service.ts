import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;
  async create(createClienteDto: CreateClienteDto) {
    const newClient = await this.clientRepository.create(createClienteDto);
    await this.clientRepository.save(newClient);
    return newClient;
  }

  async findAll() {
    const clientes = await this.clientRepository.find({
      where: {
        isActive: true
      }
    });
    return clientes;
  }

  async findOne(id: string) {
    //validamos que exista el cliente
    const cliente = await this.clientRepository.findOne({
      where: { id }
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    //validamos que exista el cliente
    const cliente = await this.clientRepository.findOne({
      where: { id }
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }

    // Actualizamos el cliente directamente con los campos proporcionados
    Object.assign(cliente, updateClienteDto);

    try {
      await this.clientRepository.save(cliente);
      return { message: "Cliente updated successfully", cliente };
    } catch (error) {
      throw new BadRequestException('Error al actualizar el cliente');
      
    }
  }

  async remove(id: string) {
    const cliente = await this.clientRepository.findOne({
      where: { id }
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }
    cliente.isActive = false;
    await this.clientRepository.save(cliente);
    return 'Cliente eliminado correctamente';
  }
}
