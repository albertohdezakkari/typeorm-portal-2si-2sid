import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mecanico } from './entities/mecanico.entity';
import { MecanicosService } from './mecanicos.service';
import { MecanicosController } from './mecanicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mecanico])],
  providers: [MecanicosService],
  controllers: [MecanicosController]
})
export class MecanicosModule {}
