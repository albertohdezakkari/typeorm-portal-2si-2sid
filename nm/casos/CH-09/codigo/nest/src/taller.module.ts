import { Mecanico } from './mecanicos/entities/mecanico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { MecanicosRepository } from './mecanicos/crear-listar/repository';
import { MecanicosService } from './mecanicos/crear-listar/service';
import { MecanicosController } from './mecanicos/crear-listar/controller';
import { AsignarMecanicoRepository } from './asignaciones/asignar-mecanico/repository';
import { AsignarMecanicoService } from './asignaciones/asignar-mecanico/service';
import { AsignarMecanicoController } from './asignaciones/asignar-mecanico/controller';
import { ListarPorReparacionRepository } from './asignaciones/listar-por-reparacion/repository';
import { ListarPorReparacionService } from './asignaciones/listar-por-reparacion/service';
import { ListarPorReparacionController } from './asignaciones/listar-por-reparacion/controller';
import { ListarPorMecanicoRepository } from './asignaciones/listar-por-mecanico/repository';
import { ListarPorMecanicoService } from './asignaciones/listar-por-mecanico/service';
import { ListarPorMecanicoController } from './asignaciones/listar-por-mecanico/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './talleres/entities/taller.entity';
import { Reparacion } from './reparaciones/entities/reparacion.entity';
import { CrearListarController } from './reparaciones/crear-listar/controller';
import { CrearListarService } from './reparaciones/crear-listar/service';
import { CrearListarRepository } from './reparaciones/crear-listar/repository';
import { EliminarController } from './reparaciones/eliminar/controller';
import { EliminarService } from './reparaciones/eliminar/service';
import { EliminarRepository } from './reparaciones/eliminar/repository';
import { ModificarCosteCentimosController } from './reparaciones/modificar-coste-centimos/controller';
import { ModificarCosteCentimosService } from './reparaciones/modificar-coste-centimos/service';
import { ModificarCosteCentimosRepository } from './reparaciones/modificar-coste-centimos/repository';
import { TrasladarController } from './reparaciones/trasladar/controller';
import { TrasladarService } from './reparaciones/trasladar/service';
import { TrasladarRepository } from './reparaciones/trasladar/repository';
import { ConsultarTallerController } from './talleres/consultar/controller';
import { ConsultarTallerService } from './talleres/consultar/service';
import { ConsultarTallerRepository } from './talleres/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Taller, Reparacion, Mecanico, Asignacion])],
  controllers: [MecanicosController, AsignarMecanicoController, ListarPorReparacionController, ListarPorMecanicoController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarCosteCentimosController, TrasladarController, ConsultarTallerController],
  providers: [MecanicosRepository, MecanicosService, AsignarMecanicoRepository, AsignarMecanicoService, ListarPorReparacionRepository, ListarPorReparacionService, ListarPorMecanicoRepository, ListarPorMecanicoService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarCosteCentimosService, TrasladarService, ConsultarTallerService, CrearListarRepository, EliminarRepository, ModificarCosteCentimosRepository, TrasladarRepository, ConsultarTallerRepository]
})
export class TallerModule {}
