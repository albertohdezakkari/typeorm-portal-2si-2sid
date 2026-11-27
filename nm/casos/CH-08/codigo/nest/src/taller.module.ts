import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panaderia } from './panaderias/entities/panaderia.entity';
import { Producto } from './productos/entities/producto.entity';
import { ProductosService } from './productos/productos.service';
import { ProductosController } from './productos/productos.controller';
import { Panadero } from './panaderos/entities/panadero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { PanaderosService } from './panaderos/panaderos.service';
import { PanaderosController } from './panaderos/panaderos.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panaderia, Producto, Panadero, Asignacion])],
  controllers: [ProductosController, PanaderosController, AsignacionesController],
  providers: [ProductosService, PanaderosService, AsignacionesService]
})
export class TallerModule {}
