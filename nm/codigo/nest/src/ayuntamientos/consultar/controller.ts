import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarAyuntamientoService } from './service';

@Controller()
export class ConsultarAyuntamientoController {
  constructor(private readonly service: ConsultarAyuntamientoService) {}

  @Get('ayuntamientos/:ayuntamientoId/obras')
  async ejecutar(@Param('ayuntamientoId', ParseIntPipe) ayuntamientoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarAyuntamientoService(ayuntamientoId, minimo);
  }
}
