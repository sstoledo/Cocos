import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;


  async create(createCategoryDto: CreateCategoryDto) {
    const { name, fatherId, isActive } = createCategoryDto;

    const category = this.categoryRepository.create({
      name,
      ...(fatherId && { fatherId }), //agregamos el father si es que existe
      isActive
    });
    //guardamos en la base de datos, QUE CHUCHA MIRAS SAPASO
    try {
      await this.categoryRepository.save(category);
      return { message: "Category created successfully", category };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la categoría');
    }
  }

  async findAll() {
    //traemos todas las categorias activas
    return await this.categoryRepository.find({
      where: {
        isActive: true
      }
    });
  }

  async fathers() {
    //traemos todos los activos
    const cateActivos = await this.categoryRepository.find({
      where: {
        isActive: true
      }
    });
    //filtramos los que no tienen father
    const combo = cateActivos
      .filter(cate => cate.fatherId !== null)
      .map((c) => ({
        //traemos el nombre y el id
        id: c.id,
        name: c.name
      }));
    return combo;
  }

  async allCategories() {
    //traemos todos los activos
    const cateActivos = await this.categoryRepository.find({
      where: {
        isActive: true
      }
    });
    //mapeamos y traemos el nombre y el id
    const combo = cateActivos.map((c) => ({
      id: c.id,
      name: c.name
    }))
    return combo;
  }

  async findOne(id: string) {

    try {
      const category = await this.categoryRepository.findOne({
        where: { id }
      });
      if (!category) {
        throw new BadRequestException('La categoría no existe');
      }
      return category;
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      throw new InternalServerErrorException('Error al obtener la categoría');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Buscamos la categoría
    const category = await this.categoryRepository.findOne({
      where: { id }
    });

    // Validamos si la categoría existe
    if (!category) {
      throw new BadRequestException('La categoría no existe');
    }

    // Actualizamos la categoría directamente con los campos proporcionados
    Object.assign(category, updateCategoryDto);

    try {
      await this.categoryRepository.save(category);
      return { message: "Category updated successfully", category };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la categoría', error.message);
    }
  }

  async remove(id: string) {
    //hacemos un borrado logico
    const cate = await this.categoryRepository.findOne({
      where: { id }
    });

    //validamos que exista la categoría
    if (!cate) {
      throw new BadRequestException('La categoría no existe');
    }

    //asignamos el nuevo valor de isActive
    cate.isActive = false;
    await this.categoryRepository.save(cate);
    return 'Categoría eliminada correctamente';
  }
}
