import { Actor } from './actores/entities/actor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ActoresRepository } from './actores/crear-listar/repository';
import { ActoresService } from './actores/crear-listar/service';
import { ActoresController } from './actores/crear-listar/controller';
import { AsignarActorRepository } from './asignaciones/asignar-actor/repository';
import { AsignarActorService } from './asignaciones/asignar-actor/service';
import { AsignarActorController } from './asignaciones/asignar-actor/controller';
import { ListarPorEscenaRepository } from './asignaciones/listar-por-escena/repository';
import { ListarPorEscenaService } from './asignaciones/listar-por-escena/service';
import { ListarPorEscenaController } from './asignaciones/listar-por-escena/controller';
import { ListarPorActorRepository } from './asignaciones/listar-por-actor/repository';
import { ListarPorActorService } from './asignaciones/listar-por-actor/service';
import { ListarPorActorController } from './asignaciones/listar-por-actor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudio } from './estudios/entities/estudio.entity';
import { Escena } from './escenas/entities/escena.entity';
import { CrearListarController } from './escenas/crear-listar/controller';
import { CrearListarService } from './escenas/crear-listar/service';
import { CrearListarRepository } from './escenas/crear-listar/repository';
import { EliminarController } from './escenas/eliminar/controller';
import { EliminarService } from './escenas/eliminar/service';
import { EliminarRepository } from './escenas/eliminar/repository';
import { ModificarDuracionSegundosController } from './escenas/modificar-duracion-segundos/controller';
import { ModificarDuracionSegundosService } from './escenas/modificar-duracion-segundos/service';
import { ModificarDuracionSegundosRepository } from './escenas/modificar-duracion-segundos/repository';
import { TrasladarController } from './escenas/trasladar/controller';
import { TrasladarService } from './escenas/trasladar/service';
import { TrasladarRepository } from './escenas/trasladar/repository';
import { ConsultarEstudioController } from './estudios/consultar/controller';
import { ConsultarEstudioService } from './estudios/consultar/service';
import { ConsultarEstudioRepository } from './estudios/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Estudio, Escena, Actor, Asignacion])],
  controllers: [ActoresController, AsignarActorController, ListarPorEscenaController, ListarPorActorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDuracionSegundosController, TrasladarController, ConsultarEstudioController],
  providers: [ActoresRepository, ActoresService, AsignarActorRepository, AsignarActorService, ListarPorEscenaRepository, ListarPorEscenaService, ListarPorActorRepository, ListarPorActorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDuracionSegundosService, TrasladarService, ConsultarEstudioService, CrearListarRepository, EliminarRepository, ModificarDuracionSegundosRepository, TrasladarRepository, ConsultarEstudioRepository]
})
export class TallerModule {}
