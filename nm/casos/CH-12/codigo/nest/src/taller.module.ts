import { Inspector } from './inspectores/entities/inspector.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InspectoresRepository } from './inspectores/crear-listar/repository';
import { InspectoresService } from './inspectores/crear-listar/service';
import { InspectoresController } from './inspectores/crear-listar/controller';
import { AsignarInspectorRepository } from './asignaciones/asignar-inspector/repository';
import { AsignarInspectorService } from './asignaciones/asignar-inspector/service';
import { AsignarInspectorController } from './asignaciones/asignar-inspector/controller';
import { ListarPorLoteRepository } from './asignaciones/listar-por-lote/repository';
import { ListarPorLoteService } from './asignaciones/listar-por-lote/service';
import { ListarPorLoteController } from './asignaciones/listar-por-lote/controller';
import { ListarPorInspectorRepository } from './asignaciones/listar-por-inspector/repository';
import { ListarPorInspectorService } from './asignaciones/listar-por-inspector/service';
import { ListarPorInspectorController } from './asignaciones/listar-por-inspector/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cooperativa } from './cooperativas/entities/cooperativa.entity';
import { Lote } from './lotes/entities/lote.entity';
import { CrearListarController } from './lotes/crear-listar/controller';
import { CrearListarService } from './lotes/crear-listar/service';
import { CrearListarRepository } from './lotes/crear-listar/repository';
import { EliminarController } from './lotes/eliminar/controller';
import { EliminarService } from './lotes/eliminar/service';
import { EliminarRepository } from './lotes/eliminar/repository';
import { ModificarKilosController } from './lotes/modificar-kilos/controller';
import { ModificarKilosService } from './lotes/modificar-kilos/service';
import { ModificarKilosRepository } from './lotes/modificar-kilos/repository';
import { TrasladarController } from './lotes/trasladar/controller';
import { TrasladarService } from './lotes/trasladar/service';
import { TrasladarRepository } from './lotes/trasladar/repository';
import { ConsultarCooperativaController } from './cooperativas/consultar/controller';
import { ConsultarCooperativaService } from './cooperativas/consultar/service';
import { ConsultarCooperativaRepository } from './cooperativas/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cooperativa, Lote, Inspector, Asignacion])],
  controllers: [InspectoresController, AsignarInspectorController, ListarPorLoteController, ListarPorInspectorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarKilosController, TrasladarController, ConsultarCooperativaController],
  providers: [InspectoresRepository, InspectoresService, AsignarInspectorRepository, AsignarInspectorService, ListarPorLoteRepository, ListarPorLoteService, ListarPorInspectorRepository, ListarPorInspectorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarKilosService, TrasladarService, ConsultarCooperativaService, CrearListarRepository, EliminarRepository, ModificarKilosRepository, TrasladarRepository, ConsultarCooperativaRepository]
})
export class TallerModule {}
