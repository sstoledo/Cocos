import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutomovilService } from './automovil.service';
import { CreateAutomovilDto } from './dto/create-automovil.dto';
import { UpdateAutomovilDto } from './dto/update-automovil.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('automovil')
@Auth(ValidRoles.admin)
export class AutomovilController {
  constructor(private readonly automovilService: AutomovilService) {}

  @Post()
  create(@Body() createAutomovilDto: CreateAutomovilDto) {
    return this.automovilService.create(createAutomovilDto);
  }

  @Get()
  findAll() {
    return this.automovilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.automovilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutomovilDto: UpdateAutomovilDto) {
    return this.automovilService.update(id, updateAutomovilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.automovilService.remove(id);
  }
}
