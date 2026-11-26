import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarRefugioService } from './service';

@Controller()
export class ConsultarRefugioController {
  constructor(private readonly service: ConsultarRefugioService) {}

  @Get('refugios/:refugioId/animales')
  async ejecutar(@Param('refugioId', ParseIntPipe) refugioId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarRefugioService(refugioId, minimo);
  }
}
