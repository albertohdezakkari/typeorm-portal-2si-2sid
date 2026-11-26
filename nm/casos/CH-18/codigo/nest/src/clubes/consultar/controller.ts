import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarClubService } from './service';

@Controller()
export class ConsultarClubController {
  constructor(private readonly service: ConsultarClubService) {}

  @Get('clubes/:clubId/actividades')
  async ejecutar(@Param('clubId', ParseIntPipe) clubId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarClubService(clubId, minimo);
  }
}
