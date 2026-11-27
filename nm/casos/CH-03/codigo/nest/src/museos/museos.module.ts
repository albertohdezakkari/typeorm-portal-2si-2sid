import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museo } from './entities/museo.entity';
import { MuseosService } from './museos.service';
import { MuseosController } from './museos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Museo])],
  providers: [MuseosService],
  controllers: [MuseosController]
})
export class MuseosModule {}