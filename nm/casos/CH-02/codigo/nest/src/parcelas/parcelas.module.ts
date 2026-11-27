import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huerto } from '../huertos/entities/huerto.entity';
import { Parcela } from './entities/parcela.entity';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Huerto, Parcela])],
  providers: [ParcelasService],
  controllers: [ParcelasController]
})
export class ParcelasModule {}
