import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('habitaciones/:habitacionId/hospital')
  async ejecutar(@Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Body() datos: { hospitalId: number }) {
    return this.service.trasladarHabitacionService(habitacionId, datos.hospitalId);
  }
}
