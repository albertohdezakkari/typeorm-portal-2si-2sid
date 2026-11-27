import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrenador } from './entities/entrenador.entity';
import { EntrenadoresService } from './entrenadores.service';
import { EntrenadoresController } from './entrenadores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenador])],
  providers: [EntrenadoresService],
  controllers: [EntrenadoresController]
})
export class EntrenadoresModule {}
