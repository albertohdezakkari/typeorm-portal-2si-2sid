import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cine } from './cines/entities/cine.entity';
import { Proyeccion } from './proyecciones/entities/proyeccion.entity';
import { ProyeccionesService } from './proyecciones/proyecciones.service';
import { ProyeccionesController } from './proyecciones/proyecciones.controller';
import { Tecnico } from './tecnicos/entities/tecnico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TecnicosService } from './tecnicos/tecnicos.service';
import { TecnicosController } from './tecnicos/tecnicos.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cine, Proyeccion, Tecnico, Asignacion])],
  controllers: [ProyeccionesController, TecnicosController, AsignacionesController],
  providers: [ProyeccionesService, TecnicosService, AsignacionesService]
})
export class TallerModule {}
