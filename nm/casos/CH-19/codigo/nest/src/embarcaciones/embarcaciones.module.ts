import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puerto } from '../puertos/entities/puerto.entity';
import { Embarcacion } from './entities/embarcacion.entity';
import { EmbarcacionesService } from './embarcaciones.service';
import { EmbarcacionesController } from './embarcaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Puerto, Embarcacion])],
  providers: [EmbarcacionesService],
  controllers: [EmbarcacionesController]
})
export class EmbarcacionesModule {}
