import { Module } from '@nestjs/common';
import { DetailsaleService } from './detailsale.service';
import { DetailsaleController } from './detailsale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailSale } from './entities/detailsale.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DetailsaleController],
  providers: [DetailsaleService],
  imports: [
    TypeOrmModule.forFeature([
      DetailSale
    ]),
    AuthModule
  ]
})
export class DetailsaleModule {}
