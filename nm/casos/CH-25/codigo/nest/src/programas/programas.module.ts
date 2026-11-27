import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emisora } from '../emisoras/entities/emisora.entity';
import { Programa } from './entities/programa.entity';
import { ProgramasService } from './programas.service';
import { ProgramasController } from './programas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emisora, Programa])],
  providers: [ProgramasService],
  controllers: [ProgramasController]
})
export class ProgramasModule {}
