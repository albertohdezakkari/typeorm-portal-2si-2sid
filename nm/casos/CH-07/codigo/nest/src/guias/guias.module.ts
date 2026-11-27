import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guia } from './entities/guia.entity';
import { GuiasService } from './guias.service';
import { GuiasController } from './guias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Guia])],
  providers: [GuiasService],
  controllers: [GuiasController]
})
export class GuiasModule {}
