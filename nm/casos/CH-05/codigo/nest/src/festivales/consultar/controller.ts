import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarFestivalService } from './service';

@Controller()
export class ConsultarFestivalController {
  constructor(private readonly service: ConsultarFestivalService) {}

  @Get('festivales/:festivalId/actuaciones')
  async ejecutar(@Param('festivalId', ParseIntPipe) festivalId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarFestivalService(festivalId, minimo);
  }
}
