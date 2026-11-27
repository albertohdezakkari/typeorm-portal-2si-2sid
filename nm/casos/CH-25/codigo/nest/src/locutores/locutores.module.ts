import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locutor } from './entities/locutor.entity';
import { LocutoresService } from './locutores.service';
import { LocutoresController } from './locutores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Locutor])],
  providers: [LocutoresService],
  controllers: [LocutoresController]
})
export class LocutoresModule {}
