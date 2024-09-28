import { Module } from '@nestjs/common';
import { DetailsaleService } from './detailsale.service';
import { DetailsaleController } from './detailsale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSale } from './entities/detailsale.entity';

@Module({
  controllers: [DetailsaleController],
  providers: [DetailsaleService],
  imports: [
    TypeOrmModule.forFeature([
      DetailSale
    ]),
  ]
})
export class DetailsaleModule {}
