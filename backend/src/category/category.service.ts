import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    const { name, father: fatherId, isActive } = createCategoryDto;

    // Crear la nueva categoría
    const category = this.categoryRepository.create({
      name, isActive
    });

    // Si fatherId está presente, buscar la categoría padre
    if (fatherId) {
      const father = await this.categoryRepository.findOne({ where: { id: fatherId } });

      if (!father) {
        throw new NotFoundException(`La categoría padre con id ${fatherId} no existe.`);
      }

      category.father = father; // Asignar la categoría padre
    }

    // Guardar la nueva categoría en la base de datos
    try {
      await this.categoryRepository.save(category);
      return { message: "Category created successfully", category };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la categoría');
    }
  }

  async findAll(): Promise<any> {
    const categories = await this.categoryRepository.find({
      relations: ['father'], // Nos aseguramos de cargar la relación padre
    });

    // Mapeamos solo los campos que necesitamos
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      fatherName: category.father ? category.father.name : null, // Obtenemos el nombre del padre o null si no existe
      fatherId: category.father ? category.father.id : null
    }));
  }

  async fathers() {
    // Traemos todas las categorías activas que son padres
    const fathers = await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name'])
      .where('category.isActive = :isActive', { isActive: true })
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('DISTINCT child.fatherId')
          .from(Category, 'child')
          .where('child.fatherId IS NOT NULL')
          .getQuery();
        return 'category.id IN ' + subQuery;
      })
      .distinct(true)
      .getMany();

    // Mapeamos el resultado
    return fathers.map(father => ({
      id: father.id,
      name: father.name
    }));
  }

  async allCategories() {
    //traemos todos los activos
    const cateActivos = await this.categoryRepository.find({
      relations: ['father'],
      where: {
        isActive: true
      }
    });
    //mapeamos y traemos el nombre y el id
    return cateActivos.map((category) => ({
      id: category.id,
      name: category.name,
      fatherName: category.father ? category.father.name : null,
      fatherId: category.father ? category.father.id : null
    }));
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['father'], // Cargar la relación padre
      });

      if (!category) {
        throw new NotFoundException(`La categoría con id ${id} no existe`);
      }

      // Mapear los campos de la misma manera que en findAll
      return {
        id: category.id,
        name: category.name,
        fatherName: category.father ? category.father.name : null,
        fatherId: category.father ? category.father.id : null
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
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
