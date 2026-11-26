import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDuracionSegundosService } from './service';

@Controller()
export class ModificarDuracionSegundosController {
  constructor(private readonly service: ModificarDuracionSegundosService) {}

  @Patch('escenas/:escenaId')
  async ejecutar(@Param('escenaId', ParseIntPipe) escenaId: number,
    @Body() datos: { duracionSegundos: number }) {
    return this.service.modificarDuracionSegundosService(escenaId, datos.duracionSegundos);
  }
}
