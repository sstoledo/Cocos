import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarcacarsService } from './marcacars.service';
import { CreateMarcacarDto } from './dto/create-marcacar.dto';
import { UpdateMarcacarDto } from './dto/update-marcacar.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('marcacars')
@Auth(ValidRoles.admin)
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

  @Get('all')
  allMarcacars() {
    return this.marcacarsService.allMarcacars();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcacarsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarcacarDto: UpdateMarcacarDto,
  ) {
    return this.marcacarsService.update(id, updateMarcacarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcacarsService.remove(id);
  }
}
