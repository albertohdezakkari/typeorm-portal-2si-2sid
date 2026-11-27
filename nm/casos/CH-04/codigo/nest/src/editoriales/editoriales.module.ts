import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],
  providers: [EditorialesService],
  controllers: [EditorialesController]
})
export class EditorialesModule {}