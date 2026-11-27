import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Pieza } from '../piezas/entities/pieza.entity';
import { Restaurador } from '../restauradores/entities/restaurador.entity';
import { AsignacionesService } from './asignaciones.service';
import { AsignacionesController } from './asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asignacion, Pieza, Restaurador])],
  providers: [AsignacionesService],
  controllers: [AsignacionesController]
})
export class AsignacionesModule {}
