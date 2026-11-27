import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Granja } from '../granjas/entities/granja.entity';
import { Cosecha } from './entities/cosecha.entity';
import { CosechasService } from './cosechas.service';
import { CosechasController } from './cosechas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Granja, Cosecha])],
  providers: [CosechasService],
  controllers: [CosechasController]
})
export class CosechasModule {}
