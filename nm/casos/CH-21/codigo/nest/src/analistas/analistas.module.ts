import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analista } from './entities/analista.entity';
import { AnalistasService } from './analistas.service';
import { AnalistasController } from './analistas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Analista])],
  providers: [AnalistasService],
  controllers: [AnalistasController]
})
export class AnalistasModule {}
