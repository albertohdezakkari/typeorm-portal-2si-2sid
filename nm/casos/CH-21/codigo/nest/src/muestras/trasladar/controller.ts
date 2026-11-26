import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('muestras/:muestraId/laboratorio')
  async ejecutar(@Param('muestraId', ParseIntPipe) muestraId: number,
    @Body() datos: { laboratorioId: number }) {
    return this.service.trasladarMuestraService(muestraId, datos.laboratorioId);
  }
}
