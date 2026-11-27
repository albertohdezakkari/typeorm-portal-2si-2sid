import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from './entities/festival.entity';
import { FestivalesService } from './festivales.service';
import { FestivalesController } from './festivales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Festival])],
  providers: [FestivalesService],
  controllers: [FestivalesController]
})
export class FestivalesModule {}