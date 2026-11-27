import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from './entities/obra.entity';
import { ObrasService } from './obras.service';
import { ObrasController } from './obras.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ayuntamiento, Obra])],
  providers: [ObrasService],
  controllers: [ObrasController]
})
export class ObrasModule {}
