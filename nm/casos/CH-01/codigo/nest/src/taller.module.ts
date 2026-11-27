import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refugio } from './refugios/entities/refugio.entity';
import { Animal } from './animales/entities/animal.entity';
import { AnimalesService } from './animales/animales.service';
import { AnimalesController } from './animales/animales.controller';
import { Cuidador } from './cuidadores/entities/cuidador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CuidadoresService } from './cuidadores/cuidadores.service';
import { CuidadoresController } from './cuidadores/cuidadores.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Refugio, Animal, Cuidador, Asignacion])],
  controllers: [AnimalesController, CuidadoresController, AsignacionesController],
  providers: [AnimalesService, CuidadoresService, AsignacionesService]
})
export class TallerModule {}
