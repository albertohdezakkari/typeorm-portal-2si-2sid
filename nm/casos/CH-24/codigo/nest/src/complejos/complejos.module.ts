import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complejo } from './entities/complejo.entity';
import { ComplejosService } from './complejos.service';
import { ComplejosController } from './complejos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Complejo])],
  providers: [ComplejosService],
  controllers: [ComplejosController]
})
export class ComplejosModule {}