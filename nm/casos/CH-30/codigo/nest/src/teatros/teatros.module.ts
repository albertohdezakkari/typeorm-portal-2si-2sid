import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teatro } from './entities/teatro.entity';
import { TeatrosService } from './teatros.service';
import { TeatrosController } from './teatros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teatro])],
  providers: [TeatrosService],
  controllers: [TeatrosController]
})
export class TeatrosModule {}