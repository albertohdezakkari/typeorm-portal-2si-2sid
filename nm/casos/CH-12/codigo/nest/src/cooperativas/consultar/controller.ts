import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarCooperativaService } from './service';

@Controller()
export class ConsultarCooperativaController {
  constructor(private readonly service: ConsultarCooperativaService) {}

  @Get('cooperativas/:cooperativaId/lotes')
  async ejecutar(@Param('cooperativaId', ParseIntPipe) cooperativaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarCooperativaService(cooperativaId, minimo);
  }
}
