import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarHuertoService } from './service';

@Controller()
export class ConsultarHuertoController {
  constructor(private readonly service: ConsultarHuertoService) {}

  @Get('huertos/:huertoId/parcelas')
  async ejecutar(@Param('huertoId', ParseIntPipe) huertoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarHuertoService(huertoId, minimo);
  }
}
