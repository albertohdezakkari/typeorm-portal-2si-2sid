import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from '../escuelas/entities/escuela.entity';
import { Aula } from './entities/aula.entity';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Aula])],
  providers: [AulasService],
  controllers: [AulasController]
})
export class AulasModule {}
