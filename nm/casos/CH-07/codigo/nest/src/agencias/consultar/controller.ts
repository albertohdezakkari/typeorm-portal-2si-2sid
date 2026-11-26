import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarAgenciaService } from './service';

@Controller()
export class ConsultarAgenciaController {
  constructor(private readonly service: ConsultarAgenciaService) {}

  @Get('agencias/:agenciaId/excursiones')
  async ejecutar(@Param('agenciaId', ParseIntPipe) agenciaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarAgenciaService(agenciaId, minimo);
  }
}
