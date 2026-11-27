import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refugio } from './entities/refugio.entity';
import { RefugiosService } from './refugios.service';
import { RefugiosController } from './refugios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Refugio])],
  providers: [RefugiosService],
  controllers: [RefugiosController]
})
export class RefugiosModule {}