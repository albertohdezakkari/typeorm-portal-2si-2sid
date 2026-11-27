import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '../clubes/entities/club.entity';
import { Actividad } from './entities/actividad.entity';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Actividad])],
  providers: [ActividadesService],
  controllers: [ActividadesController]
})
export class ActividadesModule {}
