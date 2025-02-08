import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Lot } from 'src/lot/entities/lot.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    const newProduct = await this.productRepository.save(product);

    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  async findAll() {
    const productos = await this.productRepository.find({
      relations: ['parentProvider', 'parentCategory', 'parentPresentacion'],
    });

    const productosConStock = await Promise.all(
      productos.map(async (producto) => {
        const stockData = await this.getQuantity(producto.code);
        return {
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
          stock: stockData.total ? Number(stockData.total) : 0,
        };
      }),
    );

    return productosConStock;
  }

  async findOne(id: string) {
    const producto = await this.productRepository.findOne({
      where: { id },
    });
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
    const producto = await this.productRepository.findOne({
      where: { id },
    });
    if (!producto) {
      throw new Error('El producto no existe');
    }
    Object.assign(producto, updateProductDto);
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
      isActive: producto.isActive,
    };
  }

  async remove(id: string) {
    const producto = await this.productRepository.findOne({
      where: { id },
    });
    if (!producto) {
      throw new Error('El producto no existe');
    }
    producto.isActive = false;
    try {
      await this.productRepository.save(producto);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
    return 'Producto eliminado correctamente';
  }

  async getQuantity(code: string) {
    return await this.lotRepository
      .createQueryBuilder('lot')
      .where('lot.codeProduct = :code', { code })
      .select('SUM(lot.quantity)', 'total')
      .getRawOne();
  }

  async getCodeName() {
    const productos = await this.productRepository.find();
    const filterProductos = productos.map((producto) => {
      return {
        code: producto.code,
        name: producto.name,
      };
    });
    return filterProductos;
  }
}
