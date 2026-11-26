import { Instructor } from './instructores/entities/instructor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InstructoresRepository } from './instructores/crear-listar/repository';
import { InstructoresService } from './instructores/crear-listar/service';
import { InstructoresController } from './instructores/crear-listar/controller';
import { AsignarInstructorRepository } from './asignaciones/asignar-instructor/repository';
import { AsignarInstructorService } from './asignaciones/asignar-instructor/service';
import { AsignarInstructorController } from './asignaciones/asignar-instructor/controller';
import { ListarPorSesionRepository } from './asignaciones/listar-por-sesion/repository';
import { ListarPorSesionService } from './asignaciones/listar-por-sesion/service';
import { ListarPorSesionController } from './asignaciones/listar-por-sesion/controller';
import { ListarPorInstructorRepository } from './asignaciones/listar-por-instructor/repository';
import { ListarPorInstructorService } from './asignaciones/listar-por-instructor/service';
import { ListarPorInstructorController } from './asignaciones/listar-por-instructor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gimnasio } from './gimnasios/entities/gimnasio.entity';
import { Sesion } from './sesiones/entities/sesion.entity';
import { CrearListarController } from './sesiones/crear-listar/controller';
import { CrearListarService } from './sesiones/crear-listar/service';
import { CrearListarRepository } from './sesiones/crear-listar/repository';
import { EliminarController } from './sesiones/eliminar/controller';
import { EliminarService } from './sesiones/eliminar/service';
import { EliminarRepository } from './sesiones/eliminar/repository';
import { ModificarPlazasController } from './sesiones/modificar-plazas/controller';
import { ModificarPlazasService } from './sesiones/modificar-plazas/service';
import { ModificarPlazasRepository } from './sesiones/modificar-plazas/repository';
import { TrasladarController } from './sesiones/trasladar/controller';
import { TrasladarService } from './sesiones/trasladar/service';
import { TrasladarRepository } from './sesiones/trasladar/repository';
import { ConsultarGimnasioController } from './gimnasios/consultar/controller';
import { ConsultarGimnasioService } from './gimnasios/consultar/service';
import { ConsultarGimnasioRepository } from './gimnasios/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Gimnasio, Sesion, Instructor, Asignacion])],
  controllers: [InstructoresController, AsignarInstructorController, ListarPorSesionController, ListarPorInstructorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPlazasController, TrasladarController, ConsultarGimnasioController],
  providers: [InstructoresRepository, InstructoresService, AsignarInstructorRepository, AsignarInstructorService, ListarPorSesionRepository, ListarPorSesionService, ListarPorInstructorRepository, ListarPorInstructorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPlazasService, TrasladarService, ConsultarGimnasioService, CrearListarRepository, EliminarRepository, ModificarPlazasRepository, TrasladarRepository, ConsultarGimnasioRepository]
})
export class TallerModule {}
