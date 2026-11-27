import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafeteria } from './entities/cafeteria.entity';
import { CafeteriasService } from './cafeterias.service';
import { CafeteriasController } from './cafeterias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria])],
  providers: [CafeteriasService],
  controllers: [CafeteriasController]
})
export class CafeteriasModule {}