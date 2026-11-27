import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from '../empresas/entities/empresa.entity';
import { Proyecto } from './entities/proyecto.entity';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Proyecto])],
  providers: [ProyectosService],
  controllers: [ProyectosController]
})
export class ProyectosModule {}
