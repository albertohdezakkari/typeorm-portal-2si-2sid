import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarCantidadMlService } from './service';

@Controller()
export class ModificarCantidadMlController {
  constructor(private readonly service: ModificarCantidadMlService) {}

  @Patch('muestras/:muestraId')
  async ejecutar(@Param('muestraId', ParseIntPipe) muestraId: number,
    @Body() datos: { cantidadMl: number }) {
    return this.service.modificarCantidadMlService(muestraId, datos.cantidadMl);
  }
}
