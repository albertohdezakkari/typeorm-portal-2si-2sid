import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revisor } from './entities/revisor.entity';
import { RevisoresService } from './revisores.service';
import { RevisoresController } from './revisores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Revisor])],
  providers: [RevisoresService],
  controllers: [RevisoresController]
})
export class RevisoresModule {}
