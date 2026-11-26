import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEstacionService } from './service';

@Controller()
export class ConsultarEstacionController {
  constructor(private readonly service: ConsultarEstacionService) {}

  @Get('estaciones/:estacionId/trayectos')
  async ejecutar(@Param('estacionId', ParseIntPipe) estacionId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEstacionService(estacionId, minimo);
  }
}
