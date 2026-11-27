import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocinero } from './entities/cocinero.entity';
import { CocinerosService } from './cocineros.service';
import { CocinerosController } from './cocineros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cocinero])],
  providers: [CocinerosService],
  controllers: [CocinerosController]
})
export class CocinerosModule {}
