import { Profesional } from './profesionales/entities/profesional.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ProfesionalesRepository } from './profesionales/crear-listar/repository';
import { ProfesionalesService } from './profesionales/crear-listar/service';
import { ProfesionalesController } from './profesionales/crear-listar/controller';
import { AsignarProfesionalRepository } from './asignaciones/asignar-profesional/repository';
import { AsignarProfesionalService } from './asignaciones/asignar-profesional/service';
import { AsignarProfesionalController } from './asignaciones/asignar-profesional/controller';
import { ListarPorObraRepository } from './asignaciones/listar-por-obra/repository';
import { ListarPorObraService } from './asignaciones/listar-por-obra/service';
import { ListarPorObraController } from './asignaciones/listar-por-obra/controller';
import { ListarPorProfesionalRepository } from './asignaciones/listar-por-profesional/repository';
import { ListarPorProfesionalService } from './asignaciones/listar-por-profesional/service';
import { ListarPorProfesionalController } from './asignaciones/listar-por-profesional/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from './ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from './obras/entities/obra.entity';
import { CrearListarController } from './obras/crear-listar/controller';
import { CrearListarService } from './obras/crear-listar/service';
import { CrearListarRepository } from './obras/crear-listar/repository';
import { EliminarController } from './obras/eliminar/controller';
import { EliminarService } from './obras/eliminar/service';
import { EliminarRepository } from './obras/eliminar/repository';
import { ModificarPresupuestoEurosController } from './obras/modificar-presupuesto-euros/controller';
import { ModificarPresupuestoEurosService } from './obras/modificar-presupuesto-euros/service';
import { ModificarPresupuestoEurosRepository } from './obras/modificar-presupuesto-euros/repository';
import { TrasladarController } from './obras/trasladar/controller';
import { TrasladarService } from './obras/trasladar/service';
import { TrasladarRepository } from './obras/trasladar/repository';
import { ConsultarAyuntamientoController } from './ayuntamientos/consultar/controller';
import { ConsultarAyuntamientoService } from './ayuntamientos/consultar/service';
import { ConsultarAyuntamientoRepository } from './ayuntamientos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento, Obra, Profesional, Asignacion])],
  controllers: [ProfesionalesController, AsignarProfesionalController, ListarPorObraController, ListarPorProfesionalController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPresupuestoEurosController, TrasladarController, ConsultarAyuntamientoController],
  providers: [ProfesionalesRepository, ProfesionalesService, AsignarProfesionalRepository, AsignarProfesionalService, ListarPorObraRepository, ListarPorObraService, ListarPorProfesionalRepository, ListarPorProfesionalService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPresupuestoEurosService, TrasladarService, ConsultarAyuntamientoService, CrearListarRepository, EliminarRepository, ModificarPresupuestoEurosRepository, TrasladarRepository, ConsultarAyuntamientoRepository]
})
export class TallerModule {}
