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
    const { name, fatherId } = createCategoryDto;
    const category = this.categoryRepository.create({ name });

    if (fatherId) {
      const father = await this.categoryRepository.findOne({
        where: { id: fatherId },
        relations: ['father']
      });

      if (!father) throw new NotFoundException(`Categoría padre ${fatherId} no encontrada`);

      category.father = father;
      category.level = father.level + 1;
      category.isRootCategory = false;
    } else {
      category.isRootCategory = true;
      category.level = 0;
    }

    const savedCategory = await this.categoryRepository.save(category);

    return {
      success: true,
      message: "Category created successfully",
      data: savedCategory
    }
  }

  async findAvailableParents() {
    const parents = await this.categoryRepository.find({
      where: {
        isActive: true,
      },
      order: {
        level: 'ASC',
        name: 'ASC'
      }
    });

    return parents.map(parent => ({
      id: parent.id,
      name: parent.name,
      level: parent.level,
    }))
  }

  async getRootCategories() {
    return this.categoryRepository.find({
      where: {
        isRootCategory: true,
        isActive: true
      }
    });
  }

  async getSubcategories(parentId: string) {
    return this.categoryRepository.find({
      where: {
        father: { id: parentId },
        isActive: true
      }
    });
  }

  async getCategoryHierarchy(categoryId: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['children']
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.buildHierarchyTree(category);
  }

  private async buildHierarchyTree(category: Category) {
    const result = {
      id: category.id,
      name: category.name,
      level: category.level,
      isRootCategory: category.isRootCategory,
      children: []
    };

    if (category.children) {
      for (const child of category.children) {
        if (child.isActive) {
          result.children.push(await this.buildHierarchyTree(child));
        }
      }
    }

    return result;
  }

  async findAll(): Promise<CreateCategoryDto[]> {
    const categories = await this.categoryRepository.find({
      relations: ['father'],
      where: {
        isActive: true
      }
    });

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      level: category.level,
      fatherName: category.father?.name || null
    }));
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['father'],
      });

      if (!category) {
        throw new NotFoundException(`La categoría con id ${id} no existe`);
      }

      return {
        id: category.id,
        name: category.name,
        level: category.level,
        isRootCategory: category.isRootCategory,
        fatherName: category.father?.name || null,
        fatherId: category.father?.id || null
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener la categoría');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { fatherId, ...rest } = updateCategoryDto;

    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['father']
    });

    if (!category) {
      throw new BadRequestException('La categoría no existe');
    }

    // Si se está actualizando el padre
    if (fatherId) {
      const newFather = await this.categoryRepository.findOne({
        where: { id: fatherId },
        relations: ['father']
      });

      if (!newFather) {
        throw new NotFoundException(`Categoría padre ${fatherId} no encontrada`);
      }

      category.father = newFather;
      category.level = newFather.level + 1;
      category.isRootCategory = false;
    } else if (fatherId === null) {
      // Si se está removiendo el padre
      category.father = null;
      category.level = 0;
      category.isRootCategory = true;
    }

    Object.assign(category, rest);

    try {
      const updatedCategory = await this.categoryRepository.save(category);
      return {
        success: true,
        message: "Category updated successfully",
        category: updatedCategory
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la categoría');
    }
  }

  async remove(id: string) {
    //hacemos un borrado logico
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['children']
    });

    //Validamos que exista la categoría
    if (!category) throw new BadRequestException('La categoría no existe');

    try {
      if (category.children && category.children.length > 0) {
        const deactivateCategory = async (cat: Category) => {
          cat.isActive = false;
          await this.categoryRepository.save(cat);

          //Buscamos los hijos de esta categoria
          const children = await this.categoryRepository.find({
            where: {
              father: {
                id: cat.id
              }
            },
            relations: ['children']
          });

          for (const child of children) {
            await deactivateCategory(child);
          }
        };

        await deactivateCategory(category);

        return {
          message: 'Categoria y sus subcategorias eliminadas correctamente',
          affectedCategories: await this.countAffectedCategories(id)
        };
      } else {
        //Si no tiene hijos, solo desactivamos la categoria
        category.isActive = false;
        await this.categoryRepository.save(category);
        return {
          message: 'Categoria eliminada correctamente',
          affectedCategories: 1
        };
      }
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la categoría');
    }
  }

  private async countAffectedCategories(categoryId: string): Promise<number> {
    let count = 1;

    const countChildren = async (parentId: string)=> {
      const children = await this.categoryRepository.find({
        where: {
          father: {
            id: parentId
          }
        }
      });

      for (const child of children) {
        count++;
        await countChildren(child.id);
      }
    };

    await countChildren(categoryId);
    return count;
  }
}
