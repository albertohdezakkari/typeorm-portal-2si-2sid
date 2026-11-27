import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudio } from './entities/estudio.entity';
import { EstudiosService } from './estudios.service';
import { EstudiosController } from './estudios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudio])],
  providers: [EstudiosService],
  controllers: [EstudiosController]
})
export class EstudiosModule {}