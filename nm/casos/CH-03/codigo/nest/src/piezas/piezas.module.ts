import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museo } from '../museos/entities/museo.entity';
import { Pieza } from './entities/pieza.entity';
import { PiezasService } from './piezas.service';
import { PiezasController } from './piezas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Museo, Pieza])],
  providers: [PiezasService],
  controllers: [PiezasController]
})
export class PiezasModule {}
