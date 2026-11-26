import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarUrbanizacionService } from './service';

@Controller()
export class ConsultarUrbanizacionController {
  constructor(private readonly service: ConsultarUrbanizacionService) {}

  @Get('urbanizaciones/:urbanizacionId/plazas')
  async ejecutar(@Param('urbanizacionId', ParseIntPipe) urbanizacionId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarUrbanizacionService(urbanizacionId, minimo);
  }
}
