import { Module } from '@nestjs/common';
import { DeparturelotService } from './departurelot.service';
import { DeparturelotController } from './departurelot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartureLot } from './entities/departurelot.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DeparturelotController],
  providers: [DeparturelotService],
  imports: [
    TypeOrmModule.forFeature([
      DepartureLot
    ]),
    AuthModule
  ]
})
export class DeparturelotModule {}
