import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from '../hospitales/entities/hospital.entity';
import { Habitacion } from './entities/habitacion.entity';
import { HabitacionesService } from './habitaciones.service';
import { HabitacionesController } from './habitaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Habitacion])],
  providers: [HabitacionesService],
  controllers: [HabitacionesController]
})
export class HabitacionesModule {}
