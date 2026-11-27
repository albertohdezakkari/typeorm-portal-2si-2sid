import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from '../tiendas/entities/tienda.entity';
import { Articulo } from './entities/articulo.entity';
import { ArticulosService } from './articulos.service';
import { ArticulosController } from './articulos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda, Articulo])],
  providers: [ArticulosService],
  controllers: [ArticulosController]
})
export class ArticulosModule {}
