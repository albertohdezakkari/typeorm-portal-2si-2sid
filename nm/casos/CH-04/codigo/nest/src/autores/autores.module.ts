import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { AutoresService } from './autores.service';
import { AutoresController } from './autores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  providers: [AutoresService],
  controllers: [AutoresController]
})
export class AutoresModule {}
