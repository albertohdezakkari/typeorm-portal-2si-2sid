import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Reserva } from '../reservas/entities/reserva.entity';
import { Huesped } from '../huespedes/entities/huesped.entity';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion, Reserva, Huesped])],
  providers: [AsignacionesService],
  controllers: [AsignacionesController]
})
export class AsignacionesModule {}
