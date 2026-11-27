import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorio } from './entities/laboratorio.entity';
import { LaboratoriosService } from './laboratorios.service';
import { LaboratoriosController } from './laboratorios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorio])],
  providers: [LaboratoriosService],
  controllers: [LaboratoriosController]
})
export class LaboratoriosModule {}