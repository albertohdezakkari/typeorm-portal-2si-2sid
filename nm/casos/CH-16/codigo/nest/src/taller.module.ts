import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './tiendas/entities/tienda.entity';
import { Articulo } from './articulos/entities/articulo.entity';
import { ArticulosService } from './articulos/articulos.service';
import { ArticulosController } from './articulos/articulos.controller';
import { Vendedor } from './vendedores/entities/vendedor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { VendedoresService } from './vendedores/vendedores.service';
import { VendedoresController } from './vendedores/vendedores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda, Articulo, Vendedor, Asignacion])],
  controllers: [ArticulosController, VendedoresController, AsignacionesController],
  providers: [ArticulosService, VendedoresService, AsignacionesService]
})
export class TallerModule {}
