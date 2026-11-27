import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Granja } from './entities/granja.entity';
import { GranjasService } from './granjas.service';
import { GranjasController } from './granjas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Granja])],
  providers: [GranjasService],
  controllers: [GranjasController]
})
export class GranjasModule {}