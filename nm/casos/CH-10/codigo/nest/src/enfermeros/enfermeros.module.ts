import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enfermero } from './entities/enfermero.entity';
import { EnfermerosService } from './enfermeros.service';
import { EnfermerosController } from './enfermeros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enfermero])],
  providers: [EnfermerosService],
  controllers: [EnfermerosController]
})
export class EnfermerosModule {}
