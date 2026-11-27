import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teatro } from '../teatros/entities/teatro.entity';
import { Funcion } from './entities/funcion.entity';
import { FuncionesService } from './funciones.service';
import { FuncionesController } from './funciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teatro, Funcion])],
  providers: [FuncionesService],
  controllers: [FuncionesController]
})
export class FuncionesModule {}
