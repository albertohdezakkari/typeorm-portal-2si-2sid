import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurador } from './entities/restaurador.entity';
import { RestauradoresService } from './restauradores.service';
import { RestauradoresController } from './restauradores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurador])],
  providers: [RestauradoresService],
  controllers: [RestauradoresController]
})
export class RestauradoresModule {}
