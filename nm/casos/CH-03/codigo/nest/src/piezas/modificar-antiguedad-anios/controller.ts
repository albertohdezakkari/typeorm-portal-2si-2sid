import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarAntiguedadAniosService } from './service';

@Controller()
export class ModificarAntiguedadAniosController {
  constructor(private readonly service: ModificarAntiguedadAniosService) {}

  @Patch('piezas/:piezaId')
  async ejecutar(@Param('piezaId', ParseIntPipe) piezaId: number,
    @Body() datos: { antiguedadAnios: number }) {
    return this.service.modificarAntiguedadAniosService(piezaId, datos.antiguedadAnios);
  }
}
