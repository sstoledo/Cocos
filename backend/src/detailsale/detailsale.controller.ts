import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailsaleService } from './detailsale.service';
import { CreateDetailsaleDto } from './dto/create-detailsale.dto';
import { UpdateDetailsaleDto } from './dto/update-detailsale.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

@Controller('detailsale')
@Auth(ValidRoles.admin)
export class DetailsaleController {
  constructor(private readonly detailsaleService: DetailsaleService) {}

  @Post()
  create(@Body() createDetailsaleDto: CreateDetailsaleDto) {
    return this.detailsaleService.create(createDetailsaleDto);
  }

  @Get()
  findAll() {
    return this.detailsaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsaleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailsaleDto: UpdateDetailsaleDto,
  ) {
    return this.detailsaleService.update(id, updateDetailsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsaleService.remove(id);
  }
}
