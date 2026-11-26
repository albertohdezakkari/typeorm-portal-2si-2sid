import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarPuertoService } from './service';

@Controller()
export class ConsultarPuertoController {
  constructor(private readonly service: ConsultarPuertoService) {}

  @Get('puertos/:puertoId/embarcaciones')
  async ejecutar(@Param('puertoId', ParseIntPipe) puertoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarPuertoService(puertoId, minimo);
  }
}
