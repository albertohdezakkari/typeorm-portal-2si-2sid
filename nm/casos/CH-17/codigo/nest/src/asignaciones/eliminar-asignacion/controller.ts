import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('escenas/:escenaId/asignaciones/:actorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('escenaId') escenaId: string, @Param('actorId') actorId: string) {
    return this.service.eliminarAsignacionService(Number(escenaId), Number(actorId));
  }
}
