import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panadero } from './entities/panadero.entity';
import { PanaderosService } from './panaderos.service';
import { PanaderosController } from './panaderos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panadero])],
  providers: [PanaderosService],
  controllers: [PanaderosController]
})
export class PanaderosModule {}
