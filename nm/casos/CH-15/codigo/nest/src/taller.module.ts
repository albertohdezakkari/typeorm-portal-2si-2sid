import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresas/entities/empresa.entity';
import { Proyecto } from './proyectos/entities/proyecto.entity';
import { ProyectosService } from './proyectos/proyectos.service';
import { ProyectosController } from './proyectos/proyectos.controller';
import { Colaborador } from './colaboradores/entities/colaborador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ColaboradoresService } from './colaboradores/colaboradores.service';
import { ColaboradoresController } from './colaboradores/colaboradores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Proyecto, Colaborador, Asignacion])],
  controllers: [ProyectosController, ColaboradoresController, AsignacionesController],
  providers: [ProyectosService, ColaboradoresService, AsignacionesService]
})
export class TallerModule {}
