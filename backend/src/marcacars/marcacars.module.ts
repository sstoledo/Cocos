import { Module } from '@nestjs/common';
import { MarcacarsService } from './marcacars.service';
import { MarcacarsController } from './marcacars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaCars } from './entities/marcacar.entity';

@Module({
  controllers: [MarcacarsController],
  providers: [MarcacarsService],
  imports: [
    TypeOrmModule.forFeature([
      MarcaCars
    ]),
  ]
})
export class MarcacarsModule {}
