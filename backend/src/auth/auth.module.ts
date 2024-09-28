import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User
    ]),

    PassportModule.register({
      defaultStrategy: 'jwt'
    }),


    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=>{
        return {
          secret: configService.get("SECRET_TOKEN"),
          signOptions:{
            expiresIn: '2h'
          }
        }
      }
    }),
    ConfigModule,

    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[
    TypeOrmModule,
    PassportModule,
    JwtModule,
    JwtStrategy
  ]
})
export class AuthModule {}
