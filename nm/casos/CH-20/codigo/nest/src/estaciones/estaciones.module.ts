import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacion } from './entities/estacion.entity';
import { EstacionesService } from './estaciones.service';
import { EstacionesController } from './estaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estacion])],
  providers: [EstacionesService],
  controllers: [EstacionesController]
})
export class EstacionesModule {}