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
    const newProduct = await this.productRepository.save(product);

    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct
    };
  }

  async findAll() {
    //traemos todos los activos
    const productos = await this.productRepository.find({
      relations: ['parentProvider', 'parentCategory', 'parentPresentacion']
    });
    return productos.map(producto => ({
      id: producto.id,
      code: producto.code,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      publicId: producto.publicId,
      providerName: producto.parentProvider?.name,
      idProvider: producto.idProvider,
      categoryName: producto.parentCategory?.name,
      idCategory: producto.idCategory,
      presentacionName: producto.parentPresentacion?.name,
      idPresentacion: producto.idPresentacion,
      isActive: producto.isActive,
    }));
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
    return {
      id: producto.id,
      code: producto.code,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      publicId: producto.publicId,
      idProvider: producto.idProvider,
      idCategory: producto.idCategory,
      idPresentacion: producto.idPresentacion,
      isActive: producto.isActive,
    };
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
    return { 
      id: producto.id,
      code: producto.code,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      idProvider: producto.idProvider,
      idCategory: producto.idCategory,
      idPresentacion: producto.idPresentacion,
      publicId: producto.publicId,
      isActive: producto.isActive
    };
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
