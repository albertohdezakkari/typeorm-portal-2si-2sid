import { Docente } from './docentes/entities/docente.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { DocentesRepository } from './docentes/crear-listar/repository';
import { DocentesService } from './docentes/crear-listar/service';
import { DocentesController } from './docentes/crear-listar/controller';
import { AsignarDocenteRepository } from './asignaciones/asignar-docente/repository';
import { AsignarDocenteService } from './asignaciones/asignar-docente/service';
import { AsignarDocenteController } from './asignaciones/asignar-docente/controller';
import { ListarPorAulaRepository } from './asignaciones/listar-por-aula/repository';
import { ListarPorAulaService } from './asignaciones/listar-por-aula/service';
import { ListarPorAulaController } from './asignaciones/listar-por-aula/controller';
import { ListarPorDocenteRepository } from './asignaciones/listar-por-docente/repository';
import { ListarPorDocenteService } from './asignaciones/listar-por-docente/service';
import { ListarPorDocenteController } from './asignaciones/listar-por-docente/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './escuelas/entities/escuela.entity';
import { Aula } from './aulas/entities/aula.entity';
import { CrearListarController } from './aulas/crear-listar/controller';
import { CrearListarService } from './aulas/crear-listar/service';
import { CrearListarRepository } from './aulas/crear-listar/repository';
import { EliminarController } from './aulas/eliminar/controller';
import { EliminarService } from './aulas/eliminar/service';
import { EliminarRepository } from './aulas/eliminar/repository';
import { ModificarCapacidadController } from './aulas/modificar-capacidad/controller';
import { ModificarCapacidadService } from './aulas/modificar-capacidad/service';
import { ModificarCapacidadRepository } from './aulas/modificar-capacidad/repository';
import { TrasladarController } from './aulas/trasladar/controller';
import { TrasladarService } from './aulas/trasladar/service';
import { TrasladarRepository } from './aulas/trasladar/repository';
import { ConsultarEscuelaController } from './escuelas/consultar/controller';
import { ConsultarEscuelaService } from './escuelas/consultar/service';
import { ConsultarEscuelaRepository } from './escuelas/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Aula, Docente, Asignacion])],
  controllers: [DocentesController, AsignarDocenteController, ListarPorAulaController, ListarPorDocenteController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarCapacidadController, TrasladarController, ConsultarEscuelaController],
  providers: [DocentesRepository, DocentesService, AsignarDocenteRepository, AsignarDocenteService, ListarPorAulaRepository, ListarPorAulaService, ListarPorDocenteRepository, ListarPorDocenteService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarCapacidadService, TrasladarService, ConsultarEscuelaService, CrearListarRepository, EliminarRepository, ModificarCapacidadRepository, TrasladarRepository, ConsultarEscuelaRepository]
})
export class TallerModule {}
