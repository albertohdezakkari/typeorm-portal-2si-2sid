import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { TecnicosService } from './tecnicos.service';
import { TecnicosController } from './tecnicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tecnico])],
  providers: [TecnicosService],
  controllers: [TecnicosController]
})
export class TecnicosModule {}
