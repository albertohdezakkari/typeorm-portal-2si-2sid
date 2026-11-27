import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emisora } from './entities/emisora.entity';
import { EmisorasService } from './emisoras.service';
import { EmisorasController } from './emisoras.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emisora])],
  providers: [EmisorasService],
  controllers: [EmisorasController]
})
export class EmisorasModule {}