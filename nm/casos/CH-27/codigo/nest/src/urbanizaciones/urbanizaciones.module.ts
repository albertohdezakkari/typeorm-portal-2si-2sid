import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urbanizacion } from './entities/urbanizacion.entity';
import { UrbanizacionesService } from './urbanizaciones.service';
import { UrbanizacionesController } from './urbanizaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Urbanizacion])],
  providers: [UrbanizacionesService],
  controllers: [UrbanizacionesController]
})
export class UrbanizacionesModule {}