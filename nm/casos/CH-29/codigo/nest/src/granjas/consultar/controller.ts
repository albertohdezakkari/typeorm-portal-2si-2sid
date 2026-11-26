import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarGranjaService } from './service';

@Controller()
export class ConsultarGranjaController {
  constructor(private readonly service: ConsultarGranjaService) {}

  @Get('granjas/:granjaId/cosechas')
  async ejecutar(@Param('granjaId', ParseIntPipe) granjaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarGranjaService(granjaId, minimo);
  }
}
