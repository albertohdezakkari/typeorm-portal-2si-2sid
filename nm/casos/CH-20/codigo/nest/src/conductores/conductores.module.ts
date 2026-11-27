import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conductor } from './entities/conductor.entity';
import { ConductoresService } from './conductores.service';
import { ConductoresController } from './conductores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conductor])],
  providers: [ConductoresService],
  controllers: [ConductoresController]
})
export class ConductoresModule {}
