import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from '../viveros/entities/vivero.entity';
import { Planta } from './entities/planta.entity';
import { PlantasService } from './plantas.service';
import { PlantasController } from './plantas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero, Planta])],
  providers: [PlantasService],
  controllers: [PlantasController]
})
export class PlantasModule {}
