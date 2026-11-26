import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEscuelaService } from './service';

@Controller()
export class ConsultarEscuelaController {
  constructor(private readonly service: ConsultarEscuelaService) {}

  @Get('escuelas/:escuelaId/aulas')
  async ejecutar(@Param('escuelaId', ParseIntPipe) escuelaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEscuelaService(escuelaId, minimo);
  }
}
