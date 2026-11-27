import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafeteria } from '../cafeterias/entities/cafeteria.entity';
import { Comanda } from './entities/comanda.entity';
import { ComandasService } from './comandas.service';
import { ComandasController } from './comandas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria, Comanda])],
  providers: [ComandasService],
  controllers: [ComandasController]
})
export class ComandasModule {}
