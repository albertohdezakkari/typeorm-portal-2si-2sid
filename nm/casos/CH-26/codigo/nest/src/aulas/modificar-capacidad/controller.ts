import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarCapacidadService } from './service';

@Controller()
export class ModificarCapacidadController {
  constructor(private readonly service: ModificarCapacidadService) {}

  @Patch('aulas/:aulaId')
  async ejecutar(@Param('aulaId', ParseIntPipe) aulaId: number,
    @Body() datos: { capacidad: number }) {
    return this.service.modificarCapacidadService(aulaId, datos.capacidad);
  }
}
