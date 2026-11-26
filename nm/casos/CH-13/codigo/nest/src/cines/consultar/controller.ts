import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarCineService } from './service';

@Controller()
export class ConsultarCineController {
  constructor(private readonly service: ConsultarCineService) {}

  @Get('cines/:cineId/proyecciones')
  async ejecutar(@Param('cineId', ParseIntPipe) cineId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarCineService(cineId, minimo);
  }
}
