import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';
import { MonitoresService } from './monitores.service';
import { MonitoresController } from './monitores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Monitor])],
  providers: [MonitoresService],
  controllers: [MonitoresController]
})
export class MonitoresModule {}
