import { Module } from '@nestjs/common';
import { MarcacarsService } from './marcacars.service';
import { MarcacarsController } from './marcacars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaCars } from './entities/marcacar.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MarcacarsController],
  providers: [MarcacarsService],
  imports: [TypeOrmModule.forFeature([MarcaCars]), AuthModule],
})
export class MarcacarsModule {}
