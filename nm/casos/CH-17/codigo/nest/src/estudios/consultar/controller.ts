import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEstudioService } from './service';

@Controller()
export class ConsultarEstudioController {
  constructor(private readonly service: ConsultarEstudioService) {}

  @Get('estudios/:estudioId/escenas')
  async ejecutar(@Param('estudioId', ParseIntPipe) estudioId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEstudioService(estudioId, minimo);
  }
}
