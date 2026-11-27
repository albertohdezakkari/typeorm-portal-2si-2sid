import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from './entities/vivero.entity';
import { ViverosService } from './viveros.service';
import { ViverosController } from './viveros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero])],
  providers: [ViverosService],
  controllers: [ViverosController]
})
export class ViverosModule {}