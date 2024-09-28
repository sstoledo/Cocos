import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeparturelotService } from './departurelot.service';
import { CreateDeparturelotDto } from './dto/create-departurelot.dto';
import { UpdateDeparturelotDto } from './dto/update-departurelot.dto';

@Controller('departurelot')
export class DeparturelotController {
  constructor(private readonly departurelotService: DeparturelotService) {}

  @Post()
  create(@Body() createDeparturelotDto: CreateDeparturelotDto) {
    return this.departurelotService.create(createDeparturelotDto);
  }

  @Get()
  findAll() {
    return this.departurelotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departurelotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeparturelotDto: UpdateDeparturelotDto) {
    return this.departurelotService.update(+id, updateDeparturelotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departurelotService.remove(+id);
  }
}
