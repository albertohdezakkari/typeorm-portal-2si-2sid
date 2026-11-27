import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urbanizacion } from '../urbanizaciones/entities/urbanizacion.entity';
import { Plaza } from './entities/plaza.entity';
import { PlazasService } from './plazas.service';
import { PlazasController } from './plazas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Urbanizacion, Plaza])],
  providers: [PlazasService],
  controllers: [PlazasController]
})
export class PlazasModule {}
