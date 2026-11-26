import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDuracionMinutosService } from './service';

@Controller()
export class ModificarDuracionMinutosController {
  constructor(private readonly service: ModificarDuracionMinutosService) {}

  @Patch('proyecciones/:proyeccionId')
  async ejecutar(@Param('proyeccionId', ParseIntPipe) proyeccionId: number,
    @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutosService(proyeccionId, datos.duracionMinutos);
  }
}
