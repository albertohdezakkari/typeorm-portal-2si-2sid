import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('actividades/:actividadId')
  @HttpCode(204)
  async ejecutar(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.service.eliminarActividadService(actividadId);
  }
}
