import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarDuracionMinutosService } from './service';

@Controller()
export class ModificarDuracionMinutosController {
  constructor(private readonly service: ModificarDuracionMinutosService) {}

  @Patch('programas/:programaId')
  async ejecutar(@Param('programaId', ParseIntPipe) programaId: number,
    @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutosService(programaId, datos.duracionMinutos);
  }
}
