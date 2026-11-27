import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agencia } from './entities/agencia.entity';
import { AgenciasService } from './agencias.service';
import { AgenciasController } from './agencias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agencia])],
  providers: [AgenciasService],
  controllers: [AgenciasController]
})
export class AgenciasModule {}