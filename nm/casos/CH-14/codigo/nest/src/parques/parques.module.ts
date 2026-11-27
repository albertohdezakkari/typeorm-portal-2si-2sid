import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parque } from './entities/parque.entity';
import { ParquesService } from './parques.service';
import { ParquesController } from './parques.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Parque])],
  providers: [ParquesService],
  controllers: [ParquesController]
})
export class ParquesModule {}