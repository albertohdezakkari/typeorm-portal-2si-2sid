import { Conductor } from './conductores/entities/conductor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ConductoresRepository } from './conductores/crear-listar/repository';
import { ConductoresService } from './conductores/crear-listar/service';
import { ConductoresController } from './conductores/crear-listar/controller';
import { AsignarConductorRepository } from './asignaciones/asignar-conductor/repository';
import { AsignarConductorService } from './asignaciones/asignar-conductor/service';
import { AsignarConductorController } from './asignaciones/asignar-conductor/controller';
import { ListarPorTrayectoRepository } from './asignaciones/listar-por-trayecto/repository';
import { ListarPorTrayectoService } from './asignaciones/listar-por-trayecto/service';
import { ListarPorTrayectoController } from './asignaciones/listar-por-trayecto/controller';
import { ListarPorConductorRepository } from './asignaciones/listar-por-conductor/repository';
import { ListarPorConductorService } from './asignaciones/listar-por-conductor/service';
import { ListarPorConductorController } from './asignaciones/listar-por-conductor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacion } from './estaciones/entities/estacion.entity';
import { Trayecto } from './trayectos/entities/trayecto.entity';
import { CrearListarController } from './trayectos/crear-listar/controller';
import { CrearListarService } from './trayectos/crear-listar/service';
import { CrearListarRepository } from './trayectos/crear-listar/repository';
import { EliminarController } from './trayectos/eliminar/controller';
import { EliminarService } from './trayectos/eliminar/service';
import { EliminarRepository } from './trayectos/eliminar/repository';
import { ModificarDistanciaKmController } from './trayectos/modificar-distancia-km/controller';
import { ModificarDistanciaKmService } from './trayectos/modificar-distancia-km/service';
import { ModificarDistanciaKmRepository } from './trayectos/modificar-distancia-km/repository';
import { TrasladarController } from './trayectos/trasladar/controller';
import { TrasladarService } from './trayectos/trasladar/service';
import { TrasladarRepository } from './trayectos/trasladar/repository';
import { ConsultarEstacionController } from './estaciones/consultar/controller';
import { ConsultarEstacionService } from './estaciones/consultar/service';
import { ConsultarEstacionRepository } from './estaciones/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Estacion, Trayecto, Conductor, Asignacion])],
  controllers: [ConductoresController, AsignarConductorController, ListarPorTrayectoController, ListarPorConductorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDistanciaKmController, TrasladarController, ConsultarEstacionController],
  providers: [ConductoresRepository, ConductoresService, AsignarConductorRepository, AsignarConductorService, ListarPorTrayectoRepository, ListarPorTrayectoService, ListarPorConductorRepository, ListarPorConductorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDistanciaKmService, TrasladarService, ConsultarEstacionService, CrearListarRepository, EliminarRepository, ModificarDistanciaKmRepository, TrasladarRepository, ConsultarEstacionRepository]
})
export class TallerModule {}
