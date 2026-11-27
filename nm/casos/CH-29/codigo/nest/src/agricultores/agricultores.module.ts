import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agricultor } from './entities/agricultor.entity';
import { AgricultoresService } from './agricultores.service';
import { AgricultoresController } from './agricultores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Agricultor])],
  providers: [AgricultoresService],
  controllers: [AgricultoresController]
})
export class AgricultoresModule {}
