import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { ClubesService } from './clubes.service';
import { ClubesController } from './clubes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubesService],
  controllers: [ClubesController]
})
export class ClubesModule {}