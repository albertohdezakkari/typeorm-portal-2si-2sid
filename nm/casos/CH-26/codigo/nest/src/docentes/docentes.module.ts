import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  providers: [DocentesService],
  controllers: [DocentesController]
})
export class DocentesModule {}
