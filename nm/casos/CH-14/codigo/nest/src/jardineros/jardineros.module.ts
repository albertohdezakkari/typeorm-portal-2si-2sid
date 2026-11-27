import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jardinero } from './entities/jardinero.entity';
import { JardinerosService } from './jardineros.service';
import { JardinerosController } from './jardineros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Jardinero])],
  providers: [JardinerosService],
  controllers: [JardinerosController]
})
export class JardinerosModule {}
