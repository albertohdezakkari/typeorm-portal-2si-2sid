import { Huesped } from './huespedes/entities/huesped.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { HuespedesRepository } from './huespedes/crear-listar/repository';
import { HuespedesService } from './huespedes/crear-listar/service';
import { HuespedesController } from './huespedes/crear-listar/controller';
import { AsignarHuespedRepository } from './asignaciones/asignar-huesped/repository';
import { AsignarHuespedService } from './asignaciones/asignar-huesped/service';
import { AsignarHuespedController } from './asignaciones/asignar-huesped/controller';
import { ListarPorReservaRepository } from './asignaciones/listar-por-reserva/repository';
import { ListarPorReservaService } from './asignaciones/listar-por-reserva/service';
import { ListarPorReservaController } from './asignaciones/listar-por-reserva/controller';
import { ListarPorHuespedRepository } from './asignaciones/listar-por-huesped/repository';
import { ListarPorHuespedService } from './asignaciones/listar-por-huesped/service';
import { ListarPorHuespedController } from './asignaciones/listar-por-huesped/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hoteles/entities/hotel.entity';
import { Reserva } from './reservas/entities/reserva.entity';
import { CrearListarController } from './reservas/crear-listar/controller';
import { CrearListarService } from './reservas/crear-listar/service';
import { CrearListarRepository } from './reservas/crear-listar/repository';
import { EliminarController } from './reservas/eliminar/controller';
import { EliminarService } from './reservas/eliminar/service';
import { EliminarRepository } from './reservas/eliminar/repository';
import { ModificarNochesController } from './reservas/modificar-noches/controller';
import { ModificarNochesService } from './reservas/modificar-noches/service';
import { ModificarNochesRepository } from './reservas/modificar-noches/repository';
import { TrasladarController } from './reservas/trasladar/controller';
import { TrasladarService } from './reservas/trasladar/service';
import { TrasladarRepository } from './reservas/trasladar/repository';
import { ConsultarHotelController } from './hoteles/consultar/controller';
import { ConsultarHotelService } from './hoteles/consultar/service';
import { ConsultarHotelRepository } from './hoteles/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Reserva, Huesped, Asignacion])],
  controllers: [HuespedesController, AsignarHuespedController, ListarPorReservaController, ListarPorHuespedController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarNochesController, TrasladarController, ConsultarHotelController],
  providers: [HuespedesRepository, HuespedesService, AsignarHuespedRepository, AsignarHuespedService, ListarPorReservaRepository, ListarPorReservaService, ListarPorHuespedRepository, ListarPorHuespedService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarNochesService, TrasladarService, ConsultarHotelService, CrearListarRepository, EliminarRepository, ModificarNochesRepository, TrasladarRepository, ConsultarHotelRepository]
})
export class TallerModule {}
