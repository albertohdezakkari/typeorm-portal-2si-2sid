import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/actor.entity';
import { ActoresService } from './actores.service';
import { ActoresController } from './actores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActoresService],
  controllers: [ActoresController]
})
export class ActoresModule {}
