import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huerto } from './entities/huerto.entity';
import { HuertosService } from './huertos.service';
import { HuertosController } from './huertos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Huerto])],
  providers: [HuertosService],
  controllers: [HuertosController]
})
export class HuertosModule {}