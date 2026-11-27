import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gimnasio } from '../gimnasios/entities/gimnasio.entity';
import { Sesion } from './entities/sesion.entity';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gimnasio, Sesion])],
  providers: [SesionesService],
  controllers: [SesionesController]
})
export class SesionesModule {}
