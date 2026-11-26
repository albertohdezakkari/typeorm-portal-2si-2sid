import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarCamasService } from './service';

@Controller()
export class ModificarCamasController {
  constructor(private readonly service: ModificarCamasService) {}

  @Patch('habitaciones/:habitacionId')
  async ejecutar(@Param('habitacionId', ParseIntPipe) habitacionId: number,
    @Body() datos: { camas: number }) {
    return this.service.modificarCamasService(habitacionId, datos.camas);
  }
}
