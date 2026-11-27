import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cine } from './entities/cine.entity';
import { CinesService } from './cines.service';
import { CinesController } from './cines.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cine])],
  providers: [CinesService],
  controllers: [CinesController]
})
export class CinesModule {}