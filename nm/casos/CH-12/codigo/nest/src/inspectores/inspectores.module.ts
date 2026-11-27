import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspector } from './entities/inspector.entity';
import { InspectoresService } from './inspectores.service';
import { InspectoresController } from './inspectores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inspector])],
  providers: [InspectoresService],
  controllers: [InspectoresController]
})
export class InspectoresModule {}
