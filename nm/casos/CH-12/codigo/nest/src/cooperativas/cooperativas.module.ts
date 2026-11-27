import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cooperativa } from './entities/cooperativa.entity';
import { CooperativasService } from './cooperativas.service';
import { CooperativasController } from './cooperativas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cooperativa])],
  providers: [CooperativasService],
  controllers: [CooperativasController]
})
export class CooperativasModule {}