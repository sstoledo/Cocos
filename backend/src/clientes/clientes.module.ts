import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/cliente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [
    TypeOrmModule.forFeature([
      Client
    ]),
    AuthModule
  ]
})
export class ClientesModule {}
