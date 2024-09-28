import { Module } from '@nestjs/common';
import { DeparturelotService } from './departurelot.service';
import { DeparturelotController } from './departurelot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartureLot } from './entities/departurelot.entity';

@Module({
  controllers: [DeparturelotController],
  providers: [DeparturelotService],
  imports: [
    TypeOrmModule.forFeature([
      DepartureLot
    ]),
  ]
})
export class DeparturelotModule {}
