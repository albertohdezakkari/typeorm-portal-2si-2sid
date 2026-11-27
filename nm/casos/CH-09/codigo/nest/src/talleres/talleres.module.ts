import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './entities/taller.entity';
import { TalleresService } from './talleres.service';
import { TalleresController } from './talleres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Taller])],
  providers: [TalleresService],
  controllers: [TalleresController]
})
export class TalleresModule {}