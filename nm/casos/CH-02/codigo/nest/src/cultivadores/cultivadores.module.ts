import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cultivador } from './entities/cultivador.entity';
import { CultivadoresService } from './cultivadores.service';
import { CultivadoresController } from './cultivadores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cultivador])],
  providers: [CultivadoresService],
  controllers: [CultivadoresController]
})
export class CultivadoresModule {}
