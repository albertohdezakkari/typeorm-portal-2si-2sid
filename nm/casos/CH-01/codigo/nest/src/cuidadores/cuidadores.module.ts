import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuidador } from './entities/cuidador.entity';
import { CuidadoresService } from './cuidadores.service';
import { CuidadoresController } from './cuidadores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cuidador])],
  providers: [CuidadoresService],
  controllers: [CuidadoresController]
})
export class CuidadoresModule {}
