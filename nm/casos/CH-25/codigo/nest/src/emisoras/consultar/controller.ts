import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEmisoraService } from './service';

@Controller()
export class ConsultarEmisoraController {
  constructor(private readonly service: ConsultarEmisoraService) {}

  @Get('emisoras/:emisoraId/programas')
  async ejecutar(@Param('emisoraId', ParseIntPipe) emisoraId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEmisoraService(emisoraId, minimo);
  }
}
