import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teatro } from './teatros/entities/teatro.entity';
import { Funcion } from './funciones/entities/funcion.entity';
import { FuncionesService } from './funciones/funciones.service';
import { FuncionesController } from './funciones/funciones.controller';
import { Interprete } from './interpretes/entities/interprete.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InterpretesService } from './interpretes/interpretes.service';
import { InterpretesController } from './interpretes/interpretes.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teatro, Funcion, Interprete, Asignacion])],
  controllers: [FuncionesController, InterpretesController, AsignacionesController],
  providers: [FuncionesService, InterpretesService, AsignacionesService]
})
export class TallerModule {}
