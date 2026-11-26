import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarGimnasioService } from './service';

@Controller()
export class ConsultarGimnasioController {
  constructor(private readonly service: ConsultarGimnasioService) {}

  @Get('gimnasios/:gimnasioId/sesiones')
  async ejecutar(@Param('gimnasioId', ParseIntPipe) gimnasioId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarGimnasioService(gimnasioId, minimo);
  }
}
