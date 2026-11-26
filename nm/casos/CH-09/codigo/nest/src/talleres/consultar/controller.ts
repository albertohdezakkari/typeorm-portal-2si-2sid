import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarTallerService } from './service';

@Controller()
export class ConsultarTallerController {
  constructor(private readonly service: ConsultarTallerService) {}

  @Get('talleres/:tallerId/reparaciones')
  async ejecutar(@Param('tallerId', ParseIntPipe) tallerId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarTallerService(tallerId, minimo);
  }
}
