import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarHospitalService } from './service';

@Controller()
export class ConsultarHospitalController {
  constructor(private readonly service: ConsultarHospitalService) {}

  @Get('hospitales/:hospitalId/habitaciones')
  async ejecutar(@Param('hospitalId', ParseIntPipe) hospitalId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarHospitalService(hospitalId, minimo);
  }
}
