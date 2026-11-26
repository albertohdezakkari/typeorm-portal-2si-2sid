import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarLaboratorioService } from './service';

@Controller()
export class ConsultarLaboratorioController {
  constructor(private readonly service: ConsultarLaboratorioService) {}

  @Get('laboratorios/:laboratorioId/muestras')
  async ejecutar(@Param('laboratorioId', ParseIntPipe) laboratorioId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarLaboratorioService(laboratorioId, minimo);
  }
}
