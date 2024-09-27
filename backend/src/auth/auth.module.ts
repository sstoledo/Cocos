import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User
    ]),

    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[
    TypeOrmModule
  ]
})
export class AuthModule {}
