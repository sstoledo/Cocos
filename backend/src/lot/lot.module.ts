import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LotController],
  providers: [LotService],
  imports: [
    TypeOrmModule.forFeature([
      Lot
    ]),
    AuthModule
  ]
})
export class LotModule {}
