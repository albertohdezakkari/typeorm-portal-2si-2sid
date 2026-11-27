import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parque } from '../parques/entities/parque.entity';
import { Zona } from './entities/zona.entity';
import { ZonasService } from './zonas.service';
import { ZonasController } from './zonas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Parque, Zona])],
  providers: [ZonasService],
  controllers: [ZonasController]
})
export class ZonasModule {}
