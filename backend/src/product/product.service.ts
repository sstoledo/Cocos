import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;
  async create(createProductDto: CreateProductDto) {
    //creamos la instancia
    const product = await this.productRepository.create(createProductDto);
    //guardamos en la base de datos
    try {
      const newProduct = await this.productRepository.save(product);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
    return {
      success: true,
      message: 'Product created successfully', 
      data: product };
  }

  async findAll() {
    //traemos todos los activos
    const productos = await this.productRepository.find({
      where: {
        isActive: true
      }
    });
    return productos;
  }

  async findOne(id: string) {
    //buscamos el producto
    const producto = await this.productRepository.findOne({
      where: { id }
    });
    //validamos que exista el producto
    if (!producto) {
      throw new Error('El producto no existe');
    }
    return producto;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    //buscamos el producto
    const producto = await this.productRepository.findOne({
      where: { id }
    });
    //validamos que exista el producto
    if (!producto) {
      throw new Error('El producto no existe');
    }
    //actualizamos el producto directamente con los campos proporcionados
    Object.assign(producto, updateProductDto);
    //guardamos en la base de datos
    try {
      await this.productRepository.save(producto);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
    return { message: 'Product updated successfully', producto };
  }

  async remove(id: string) {
    //buscamos el producto
    const producto = await this.productRepository.findOne({
      where: { id }
    });
    //validamos que exista el producto
    if (!producto) {
      throw new Error('El producto no existe');
    }
    //actualizamos el isActive
    producto.isActive = false;
    //guardamos en la base de datos
    try {
      await this.productRepository.save(producto);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
    return 'Producto eliminado correctamente';
  }
}
