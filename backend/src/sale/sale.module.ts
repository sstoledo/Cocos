import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [
    TypeOrmModule.forFeature([
      Sale
    ]),
    AuthModule
  ]
})
export class SaleModule {}
