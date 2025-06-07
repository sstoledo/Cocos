import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('category')
@Auth(ValidRoles.admin)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('roots')
  fathers() {
    return this.categoryService.getRootCategories();
  }

  @Get('parents')
  parents(){
    return this.categoryService.findAvailableParents();
  }

  @Get('subcategories/:id')
  getSubcategories(@Param('id') id: string) {
    return this.categoryService.getSubcategories(id);
  }

  @Get('hierarchy/:id')
  getCategoryHierarchy(@Param('id') id: string) {
    return this.categoryService.getCategoryHierarchy(id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
