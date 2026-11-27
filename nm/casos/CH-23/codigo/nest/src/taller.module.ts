import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafeteria } from './cafeterias/entities/cafeteria.entity';
import { Comanda } from './comandas/entities/comanda.entity';
import { ComandasService } from './comandas/comandas.service';
import { ComandasController } from './comandas/comandas.controller';
import { Cocinero } from './cocineros/entities/cocinero.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CocinerosService } from './cocineros/cocineros.service';
import { CocinerosController } from './cocineros/cocineros.controller';
import { AsignacionesService } from './asignaciones/asignaciones.service';
import { AsignacionesController } from './asignaciones/asignaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria, Comanda, Cocinero, Asignacion])],
  controllers: [ComandasController, CocinerosController, AsignacionesController],
  providers: [ComandasService, CocinerosService, AsignacionesService]
})
export class TallerModule {}
