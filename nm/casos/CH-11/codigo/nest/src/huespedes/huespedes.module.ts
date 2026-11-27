import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huesped } from './entities/huesped.entity';
import { HuespedesService } from './huespedes.service';
import { HuespedesController } from './huespedes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Huesped])],
  providers: [HuespedesService],
  controllers: [HuespedesController]
})
export class HuespedesModule {}
