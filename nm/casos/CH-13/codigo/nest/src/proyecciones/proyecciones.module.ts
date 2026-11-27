import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cine } from '../cines/entities/cine.entity';
import { Proyeccion } from './entities/proyeccion.entity';
import { ProyeccionesService } from './proyecciones.service';
import { ProyeccionesController } from './proyecciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cine, Proyeccion])],
  providers: [ProyeccionesService],
  controllers: [ProyeccionesController]
})
export class ProyeccionesModule {}
