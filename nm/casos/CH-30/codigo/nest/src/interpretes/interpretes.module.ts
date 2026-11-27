import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interprete } from './entities/interprete.entity';
import { InterpretesService } from './interpretes.service';
import { InterpretesController } from './interpretes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Interprete])],
  providers: [InterpretesService],
  controllers: [InterpretesController]
})
export class InterpretesModule {}
