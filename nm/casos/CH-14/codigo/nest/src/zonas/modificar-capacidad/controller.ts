import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarCapacidadService } from './service';

@Controller()
export class ModificarCapacidadController {
  constructor(private readonly service: ModificarCapacidadService) {}

  @Patch('zonas/:zonaId')
  async ejecutar(@Param('zonaId', ParseIntPipe) zonaId: number,
    @Body() datos: { capacidad: number }) {
    return this.service.modificarCapacidadService(zonaId, datos.capacidad);
  }
}
