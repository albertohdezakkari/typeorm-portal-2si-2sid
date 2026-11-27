import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cooperativa } from '../cooperativas/entities/cooperativa.entity';
import { Lote } from './entities/lote.entity';
import { LotesService } from './lotes.service';
import { LotesController } from './lotes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cooperativa, Lote])],
  providers: [LotesService],
  controllers: [LotesController]
})
export class LotesModule {}
