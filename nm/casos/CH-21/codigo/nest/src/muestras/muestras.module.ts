import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import { Muestra } from './entities/muestra.entity';
import { MuestrasService } from './muestras.service';
import { MuestrasController } from './muestras.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorio, Muestra])],
  providers: [MuestrasService],
  controllers: [MuestrasController]
})
export class MuestrasModule {}
