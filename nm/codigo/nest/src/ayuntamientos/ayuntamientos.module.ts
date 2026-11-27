import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from './entities/ayuntamiento.entity';
import { AyuntamientosService } from './ayuntamientos.service';
import { AyuntamientosController } from './ayuntamientos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento])],
  providers: [AyuntamientosService],
  controllers: [AyuntamientosController]
})
export class AyuntamientosModule {}