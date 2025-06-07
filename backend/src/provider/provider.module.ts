import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [TypeOrmModule.forFeature([Provider]), AuthModule],
})
export class ProviderModule {}
