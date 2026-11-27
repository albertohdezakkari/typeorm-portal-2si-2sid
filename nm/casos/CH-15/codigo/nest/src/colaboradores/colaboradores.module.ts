import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { ColaboradoresService } from './colaboradores.service';
import { ColaboradoresController } from './colaboradores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador])],
  providers: [ColaboradoresService],
  controllers: [ColaboradoresController]
})
export class ColaboradoresModule {}
