import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puerto } from './entities/puerto.entity';
import { PuertosService } from './puertos.service';
import { PuertosController } from './puertos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Puerto])],
  providers: [PuertosService],
  controllers: [PuertosController]
})
export class PuertosModule {}