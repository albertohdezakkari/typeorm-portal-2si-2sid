import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarMuseoService } from './service';

@Controller()
export class ConsultarMuseoController {
  constructor(private readonly service: ConsultarMuseoService) {}

  @Get('museos/:museoId/piezas')
  async ejecutar(@Param('museoId', ParseIntPipe) museoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarMuseoService(museoId, minimo);
  }
}
