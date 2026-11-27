import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panaderia } from './entities/panaderia.entity';
import { PanaderiasService } from './panaderias.service';
import { PanaderiasController } from './panaderias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Panaderia])],
  providers: [PanaderiasService],
  controllers: [PanaderiasController]
})
export class PanaderiasModule {}