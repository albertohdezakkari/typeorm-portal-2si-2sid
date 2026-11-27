import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tripulante } from './entities/tripulante.entity';
import { TripulantesService } from './tripulantes.service';
import { TripulantesController } from './tripulantes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tripulante])],
  providers: [TripulantesService],
  controllers: [TripulantesController]
})
export class TripulantesModule {}
