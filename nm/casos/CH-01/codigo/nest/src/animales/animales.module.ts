import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refugio } from '../refugios/entities/refugio.entity';
import { Animal } from './entities/animal.entity';
import { AnimalesService } from './animales.service';
import { AnimalesController } from './animales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Refugio, Animal])],
  providers: [AnimalesService],
  controllers: [AnimalesController]
})
export class AnimalesModule {}
