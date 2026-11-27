import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { InstructoresService } from './instructores.service';
import { InstructoresController } from './instructores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  providers: [InstructoresService],
  controllers: [InstructoresController]
})
export class InstructoresModule {}
