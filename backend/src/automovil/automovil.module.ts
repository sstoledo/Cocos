import { Module } from '@nestjs/common';
import { AutomovilService } from './automovil.service';
import { AutomovilController } from './automovil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Automovil } from './entities/automovil.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Automovil]), AuthModule],
  controllers: [AutomovilController],
  providers: [AutomovilService],
})
export class AutomovilModule {}
