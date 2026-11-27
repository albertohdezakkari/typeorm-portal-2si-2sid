import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { EscuelasService } from './escuelas.service';
import { EscuelasController } from './escuelas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela])],
  providers: [EscuelasService],
  controllers: [EscuelasController]
})
export class EscuelasModule {}