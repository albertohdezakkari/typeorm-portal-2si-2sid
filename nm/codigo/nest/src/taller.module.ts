import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from './ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from './obras/entities/obra.entity';
import { ObrasService } from './obras/obras.service';
import { ObrasController } from './obras/obras.controller';
import { Profesional } from './profesionales/entities/profesional.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ProfesionalesService } from './profesionales/profesionales.service';
import { ProfesionalesController } from './profesionales/profesionales.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento, Obra, Profesional, Asignacion])],
  controllers: [ObrasController, ProfesionalesController, AsignacionesController],
  providers: [ObrasService, ProfesionalesService, AsignacionesService]
})
export class TallerModule {}
