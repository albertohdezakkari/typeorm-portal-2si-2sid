import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gimnasio } from './entities/gimnasio.entity';
import { GimnasiosService } from './gimnasios.service';
import { GimnasiosController } from './gimnasios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gimnasio])],
  providers: [GimnasiosService],
  controllers: [GimnasiosController]
})
export class GimnasiosModule {}