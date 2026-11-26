import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarViveroService } from './service';

@Controller()
export class ConsultarViveroController {
  constructor(private readonly service: ConsultarViveroService) {}

  @Get('viveros/:viveroId/plantas')
  async ejecutar(@Param('viveroId', ParseIntPipe) viveroId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarViveroService(viveroId, minimo);
  }
}
