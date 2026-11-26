import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('pistas/:pistaId/asignaciones/:entrenadorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('pistaId') pistaId: string, @Param('entrenadorId') entrenadorId: string) {
    return this.service.eliminarAsignacionService(Number(pistaId), Number(entrenadorId));
  }
}
