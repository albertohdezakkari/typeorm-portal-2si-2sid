import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarTeatroService } from './service';

@Controller()
export class ConsultarTeatroController {
  constructor(private readonly service: ConsultarTeatroService) {}

  @Get('teatros/:teatroId/funciones')
  async ejecutar(@Param('teatroId', ParseIntPipe) teatroId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarTeatroService(teatroId, minimo);
  }
}
