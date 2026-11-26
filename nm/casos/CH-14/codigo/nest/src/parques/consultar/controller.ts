import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarParqueService } from './service';

@Controller()
export class ConsultarParqueController {
  constructor(private readonly service: ConsultarParqueService) {}

  @Get('parques/:parqueId/zonas')
  async ejecutar(@Param('parqueId', ParseIntPipe) parqueId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarParqueService(parqueId, minimo);
  }
}
