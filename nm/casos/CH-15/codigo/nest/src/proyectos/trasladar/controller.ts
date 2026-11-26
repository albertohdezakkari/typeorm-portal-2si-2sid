import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('proyectos/:proyectoId/empresa')
  async ejecutar(@Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() datos: { empresaId: number }) {
    return this.service.trasladarProyectoService(proyectoId, datos.empresaId);
  }
}
