import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PresentacionService } from './presentacion.service';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('presentacion')
@Auth(ValidRoles.admin)
export class PresentacionController {
  constructor(private readonly presentacionService: PresentacionService) {}

  @Post()
  create(@Body() createPresentacionDto: CreatePresentacionDto) {
    return this.presentacionService.create(createPresentacionDto);
  }

  @Get()
  findAll() {
    return this.presentacionService.findAll();
  }

  @Get('all')
  allPresentacions() {
    return this.presentacionService.allPresentacions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresentacionDto: UpdatePresentacionDto,
  ) {
    return this.presentacionService.update(id, updatePresentacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentacionService.remove(id);
  }
}
