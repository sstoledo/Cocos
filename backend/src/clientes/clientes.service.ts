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
    const client = this.clientRepository.create(createClienteDto);

    const newClient = await this.clientRepository.save(client);

    return {
      message: 'Cliente creado correctamente',
      cliente: newClient,
    };
  }

  async findAll() {
    const clientes = await this.clientRepository.find({
      where: {
        isActive: true,
      },
    });
    return clientes.map((cliente) => ({
      id: cliente.id,
      name: cliente.name,
      apat: cliente.apat,
      dni: cliente.dni,
      phone: cliente.phone,
    }));
  }

  async getClientSelect() {
    const clientes = await this.clientRepository.find({
      where: {
        isActive: true,
      },
    });
    return clientes.map((cli) => ({
      id: cli.id,
      name: cli.name,
      dni: cli.dni,
    }));
  }

  async findOne(id: string) {
    //validamos que exista el cliente
    const cliente = await this.clientRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }
    return {
      id: cliente.id,
      name: cliente.name,
      apat: cliente.apat,
      amat: cliente.amat,
      dni: cliente.dni,
      address: cliente.address,
      phone: cliente.phone,
      email: cliente.email,
      inicio: cliente.createdAt.toISOString(),
    };
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    //validamos que exista el cliente
    const cliente = await this.clientRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }

    // Actualizamos el cliente directamente con los campos proporcionados
    Object.assign(cliente, updateClienteDto);
    await this.clientRepository.save(cliente);
    return {
      message: 'Cliente updated successfully',
      success: true,
    };
  }

  async remove(id: string) {
    const cliente = await this.clientRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new BadRequestException('El cliente no existe');
    }
    cliente.isActive = false;
    await this.clientRepository.save(cliente);
    return 'Cliente eliminado correctamente';
  }
}
