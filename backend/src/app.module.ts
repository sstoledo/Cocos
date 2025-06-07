import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ClientesModule } from './clientes/clientes.module';
import { CategoryModule } from './category/category.module';
import { ProviderModule } from './provider/provider.module';
import { PresentacionModule } from './presentacion/presentacion.module';
import { ProductModule } from './product/product.module';
import { MarcacarsModule } from './marcacars/marcacars.module';
import { LotModule } from './lot/lot.module';
import { SaleModule } from './sale/sale.module';
import { DetailsaleModule } from './detailsale/detailsale.module';
import { DeparturelotModule } from './departurelot/departurelot.module';
import { AutomovilModule } from './automovil/automovil.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CloudinaryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    CommonModule,
    ClientesModule,
    CategoryModule,
    ProviderModule,
    PresentacionModule,
    ProductModule,
    MarcacarsModule,
    LotModule,
    SaleModule,
    DetailsaleModule,
    DeparturelotModule,
    AutomovilModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
