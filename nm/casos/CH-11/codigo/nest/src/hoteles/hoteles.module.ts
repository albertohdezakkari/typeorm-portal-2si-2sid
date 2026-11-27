import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelesService } from './hoteles.service';
import { HotelesController } from './hoteles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  providers: [HotelesService],
  controllers: [HotelesController]
})
export class HotelesModule {}