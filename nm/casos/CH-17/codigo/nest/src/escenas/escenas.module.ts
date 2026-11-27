import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudio } from '../estudios/entities/estudio.entity';
import { Escena } from './entities/escena.entity';
import { EscenasService } from './escenas.service';
import { EscenasController } from './escenas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudio, Escena])],
  providers: [EscenasService],
  controllers: [EscenasController]
})
export class EscenasModule {}
