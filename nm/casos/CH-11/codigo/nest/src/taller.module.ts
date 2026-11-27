import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hoteles/entities/hotel.entity';
import { Reserva } from './reservas/entities/reserva.entity';
import { ReservasService } from './reservas/reservas.service';
import { ReservasController } from './reservas/reservas.controller';
import { Huesped } from './huespedes/entities/huesped.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { HuespedesService } from './huespedes/huespedes.service';
import { HuespedesController } from './huespedes/huespedes.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Reserva, Huesped, Asignacion])],
  controllers: [ReservasController, HuespedesController, AsignacionesController],
  providers: [ReservasService, HuespedesService, AsignacionesService]
})
export class TallerModule {}
