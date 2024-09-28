import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcacarsService } from './marcacars.service';
import { CreateMarcacarDto } from './dto/create-marcacar.dto';
import { UpdateMarcacarDto } from './dto/update-marcacar.dto';

@Controller('marcacars')
export class MarcacarsController {
  constructor(private readonly marcacarsService: MarcacarsService) {}

  @Post()
  create(@Body() createMarcacarDto: CreateMarcacarDto) {
    return this.marcacarsService.create(createMarcacarDto);
  }

  @Get()
  findAll() {
    return this.marcacarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcacarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcacarDto: UpdateMarcacarDto) {
    return this.marcacarsService.update(+id, updateMarcacarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcacarsService.remove(+id);
  }
}
