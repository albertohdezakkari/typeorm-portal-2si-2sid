import { Monitor } from './monitores/entities/monitor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { MonitoresRepository } from './monitores/crear-listar/repository';
import { MonitoresService } from './monitores/crear-listar/service';
import { MonitoresController } from './monitores/crear-listar/controller';
import { AsignarMonitorRepository } from './asignaciones/asignar-monitor/repository';
import { AsignarMonitorService } from './asignaciones/asignar-monitor/service';
import { AsignarMonitorController } from './asignaciones/asignar-monitor/controller';
import { ListarPorActividadRepository } from './asignaciones/listar-por-actividad/repository';
import { ListarPorActividadService } from './asignaciones/listar-por-actividad/service';
import { ListarPorActividadController } from './asignaciones/listar-por-actividad/controller';
import { ListarPorMonitorRepository } from './asignaciones/listar-por-monitor/repository';
import { ListarPorMonitorService } from './asignaciones/listar-por-monitor/service';
import { ListarPorMonitorController } from './asignaciones/listar-por-monitor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './clubes/entities/club.entity';
import { Actividad } from './actividades/entities/actividad.entity';
import { CrearListarController } from './actividades/crear-listar/controller';
import { CrearListarService } from './actividades/crear-listar/service';
import { CrearListarRepository } from './actividades/crear-listar/repository';
import { EliminarController } from './actividades/eliminar/controller';
import { EliminarService } from './actividades/eliminar/service';
import { EliminarRepository } from './actividades/eliminar/repository';
import { ModificarPlazasController } from './actividades/modificar-plazas/controller';
import { ModificarPlazasService } from './actividades/modificar-plazas/service';
import { ModificarPlazasRepository } from './actividades/modificar-plazas/repository';
import { TrasladarController } from './actividades/trasladar/controller';
import { TrasladarService } from './actividades/trasladar/service';
import { TrasladarRepository } from './actividades/trasladar/repository';
import { ConsultarClubController } from './clubes/consultar/controller';
import { ConsultarClubService } from './clubes/consultar/service';
import { ConsultarClubRepository } from './clubes/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Actividad, Monitor, Asignacion])],
  controllers: [MonitoresController, AsignarMonitorController, ListarPorActividadController, ListarPorMonitorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPlazasController, TrasladarController, ConsultarClubController],
  providers: [MonitoresRepository, MonitoresService, AsignarMonitorRepository, AsignarMonitorService, ListarPorActividadRepository, ListarPorActividadService, ListarPorMonitorRepository, ListarPorMonitorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPlazasService, TrasladarService, ConsultarClubService, CrearListarRepository, EliminarRepository, ModificarPlazasRepository, TrasladarRepository, ConsultarClubRepository]
})
export class TallerModule {}
