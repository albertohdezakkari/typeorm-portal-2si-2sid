import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarPanaderiaService } from './service';

@Controller()
export class ConsultarPanaderiaController {
  constructor(private readonly service: ConsultarPanaderiaService) {}

  @Get('panaderias/:panaderiaId/productos')
  async ejecutar(@Param('panaderiaId', ParseIntPipe) panaderiaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarPanaderiaService(panaderiaId, minimo);
  }
}
