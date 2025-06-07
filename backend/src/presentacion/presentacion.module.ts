import { Module } from '@nestjs/common';
import { PresentacionService } from './presentacion.service';
import { PresentacionController } from './presentacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PresentacionController],
  providers: [PresentacionService],
  imports: [
    TypeOrmModule.forFeature([
      Presentacion
    ]),
    AuthModule
  ]
})
export class PresentacionModule {}
