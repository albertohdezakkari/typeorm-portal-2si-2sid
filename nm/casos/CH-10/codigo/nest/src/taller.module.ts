import { Enfermero } from './enfermeros/entities/enfermero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { EnfermerosRepository } from './enfermeros/crear-listar/repository';
import { EnfermerosService } from './enfermeros/crear-listar/service';
import { EnfermerosController } from './enfermeros/crear-listar/controller';
import { AsignarEnfermeroRepository } from './asignaciones/asignar-enfermero/repository';
import { AsignarEnfermeroService } from './asignaciones/asignar-enfermero/service';
import { AsignarEnfermeroController } from './asignaciones/asignar-enfermero/controller';
import { ListarPorHabitacionRepository } from './asignaciones/listar-por-habitacion/repository';
import { ListarPorHabitacionService } from './asignaciones/listar-por-habitacion/service';
import { ListarPorHabitacionController } from './asignaciones/listar-por-habitacion/controller';
import { ListarPorEnfermeroRepository } from './asignaciones/listar-por-enfermero/repository';
import { ListarPorEnfermeroService } from './asignaciones/listar-por-enfermero/service';
import { ListarPorEnfermeroController } from './asignaciones/listar-por-enfermero/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospitales/entities/hospital.entity';
import { Habitacion } from './habitaciones/entities/habitacion.entity';
import { CrearListarController } from './habitaciones/crear-listar/controller';
import { CrearListarService } from './habitaciones/crear-listar/service';
import { CrearListarRepository } from './habitaciones/crear-listar/repository';
import { EliminarController } from './habitaciones/eliminar/controller';
import { EliminarService } from './habitaciones/eliminar/service';
import { EliminarRepository } from './habitaciones/eliminar/repository';
import { ModificarCamasController } from './habitaciones/modificar-camas/controller';
import { ModificarCamasService } from './habitaciones/modificar-camas/service';
import { ModificarCamasRepository } from './habitaciones/modificar-camas/repository';
import { TrasladarController } from './habitaciones/trasladar/controller';
import { TrasladarService } from './habitaciones/trasladar/service';
import { TrasladarRepository } from './habitaciones/trasladar/repository';
import { ConsultarHospitalController } from './hospitales/consultar/controller';
import { ConsultarHospitalService } from './hospitales/consultar/service';
import { ConsultarHospitalRepository } from './hospitales/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Habitacion, Enfermero, Asignacion])],
  controllers: [EnfermerosController, AsignarEnfermeroController, ListarPorHabitacionController, ListarPorEnfermeroController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarCamasController, TrasladarController, ConsultarHospitalController],
  providers: [EnfermerosRepository, EnfermerosService, AsignarEnfermeroRepository, AsignarEnfermeroService, ListarPorHabitacionRepository, ListarPorHabitacionService, ListarPorEnfermeroRepository, ListarPorEnfermeroService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarCamasService, TrasladarService, ConsultarHospitalService, CrearListarRepository, EliminarRepository, ModificarCamasRepository, TrasladarRepository, ConsultarHospitalRepository]
})
export class TallerModule {}
