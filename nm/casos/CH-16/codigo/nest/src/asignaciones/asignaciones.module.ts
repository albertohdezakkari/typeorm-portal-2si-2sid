import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Articulo } from '../articulos/entities/articulo.entity';
import { Vendedor } from '../vendedores/entities/vendedor.entity';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion, Articulo, Vendedor])],
  providers: [AsignacionesService],
  controllers: [AsignacionesController]
})
export class AsignacionesModule {}
