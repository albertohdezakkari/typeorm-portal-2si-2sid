import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('proyectos/:proyectoId')
  @HttpCode(204)
  async ejecutar(@Param('proyectoId', ParseIntPipe) proyectoId: number) {
    return this.service.eliminarProyectoService(proyectoId);
  }
}
