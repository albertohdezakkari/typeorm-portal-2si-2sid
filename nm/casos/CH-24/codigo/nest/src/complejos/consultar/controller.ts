import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarComplejoService } from './service';

@Controller()
export class ConsultarComplejoController {
  constructor(private readonly service: ConsultarComplejoService) {}

  @Get('complejos/:complejoId/pistas')
  async ejecutar(@Param('complejoId', ParseIntPipe) complejoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarComplejoService(complejoId, minimo);
  }
}
