import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agencia } from '../agencias/entities/agencia.entity';
import { Excursion } from './entities/excursion.entity';
import { ExcursionesService } from './excursiones.service';
import { ExcursionesController } from './excursiones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agencia, Excursion])],
  providers: [ExcursionesService],
  controllers: [ExcursionesController]
})
export class ExcursionesModule {}
