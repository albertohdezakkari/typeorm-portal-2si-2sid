import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarCafeteriaService } from './service';

@Controller()
export class ConsultarCafeteriaController {
  constructor(private readonly service: ConsultarCafeteriaService) {}

  @Get('cafeterias/:cafeteriaId/comandas')
  async ejecutar(@Param('cafeteriaId', ParseIntPipe) cafeteriaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarCafeteriaService(cafeteriaId, minimo);
  }
}
