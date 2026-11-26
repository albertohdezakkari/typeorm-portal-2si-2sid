import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarHotelService } from './service';

@Controller()
export class ConsultarHotelController {
  constructor(private readonly service: ConsultarHotelService) {}

  @Get('hoteles/:hotelId/reservas')
  async ejecutar(@Param('hotelId', ParseIntPipe) hotelId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarHotelService(hotelId, minimo);
  }
}
