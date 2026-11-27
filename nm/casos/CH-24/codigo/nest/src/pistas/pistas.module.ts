import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complejo } from '../complejos/entities/complejo.entity';
import { Pista } from './entities/pista.entity';
import { PistasService } from './pistas.service';
import { PistasController } from './pistas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Complejo, Pista])],
  providers: [PistasService],
  controllers: [PistasController]
})
export class PistasModule {}
