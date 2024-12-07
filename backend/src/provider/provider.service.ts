import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  @InjectRepository(Provider)
  private readonly providerRepository: Repository<Provider>;
  async create(createProviderDto: CreateProviderDto) {
    //instanciamos un objeto nuevo
    const newProvider = this.providerRepository.create(createProviderDto);
    //guardamos en la base de datos
    try {
      await this.providerRepository.save(newProvider);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el proveedor');
    }
    return { message: 'Provider created successfully', newProvider };
  }

  async findAll() {
    //traemos todos los activos
    const providers = await this.providerRepository.find({
      where: { isActive: true }
    });
    return providers.map(pro => ({
      id: pro.id,
      name: pro.name,
      address: pro.address,
      phone: pro.phone,
      email: pro.email
    }));
  }

  async allProviders() {
    //traemos todos los activos
    const providers = await this.providerRepository.find({
      where: { isActive: true },
      select: ['id', 'name']
    });
    return providers;
  }

  async findOne(id: string) {
    //buscamos el provider
    const provider = await this.providerRepository.findOne({
      where: { id }
    });
    //validamos que exista el provider
    if (!provider) {
      throw new Error('El provider no existe');
    }
    return {
      id: provider.id,
      name: provider.name,
      address: provider.address,
      phone: provider.phone,
      email: provider.email
    }
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    //buscamos el provider
    const provider = await this.providerRepository.findOne({
      where: { id }
    });
    //validamos que exista el provider
    if (!provider) {
      throw new Error('El provider no existe');
    }
    //actualizamos el provider directamente con los campos proporcionados
    Object.assign(provider, updateProviderDto);
    //guardamos en la base de datos
    try {
      await this.providerRepository.save(provider);
    } catch (error) {
      throw new Error('Error al actualizar el provider');
    }
    return { message: 'Provider updated successfully', provider };
  }

  async remove(id: string) {
    //buscamos el provider
    const provider = await this.providerRepository.findOne({
      where: { id }
    });
    //validamos que exista el provider
    if (!provider) {
      throw new Error('El provider no existe');
    }
    //asignamos el nuevo valor de isActive
    provider.isActive = false;
    //guardamos en la base de datos
    try {
      await this.providerRepository.save(provider);
    } catch (error) {
      throw new Error('Error al eliminar el provider');
    }
    return 'Provider eliminado correctamente';
  }
}
