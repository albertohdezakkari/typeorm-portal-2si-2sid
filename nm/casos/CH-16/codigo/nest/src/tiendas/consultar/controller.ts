import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarTiendaService } from './service';

@Controller()
export class ConsultarTiendaController {
  constructor(private readonly service: ConsultarTiendaService) {}

  @Get('tiendas/:tiendaId/articulos')
  async ejecutar(@Param('tiendaId', ParseIntPipe) tiendaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarTiendaService(tiendaId, minimo);
  }
}
