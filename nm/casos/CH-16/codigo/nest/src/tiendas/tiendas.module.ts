import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './entities/tienda.entity';
import { TiendasService } from './tiendas.service';
import { TiendasController } from './tiendas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda])],
  providers: [TiendasService],
  controllers: [TiendasController]
})
export class TiendasModule {}