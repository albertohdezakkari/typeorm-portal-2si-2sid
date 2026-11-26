import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('proyecciones/:proyeccionId')
  @HttpCode(204)
  async ejecutar(@Param('proyeccionId', ParseIntPipe) proyeccionId: number) {
    return this.service.eliminarProyeccionService(proyeccionId);
  }
}
