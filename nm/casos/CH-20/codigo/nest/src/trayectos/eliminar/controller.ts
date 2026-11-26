import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('trayectos/:trayectoId')
  @HttpCode(204)
  async ejecutar(@Param('trayectoId', ParseIntPipe) trayectoId: number) {
    return this.service.eliminarTrayectoService(trayectoId);
  }
}
