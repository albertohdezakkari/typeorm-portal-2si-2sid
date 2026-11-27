import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panaderia } from '../panaderias/entities/panaderia.entity';
import { Producto } from './entities/producto.entity';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panaderia, Producto])],
  providers: [ProductosService],
  controllers: [ProductosController]
})
export class ProductosModule {}
