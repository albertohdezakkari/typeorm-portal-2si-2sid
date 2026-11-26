import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('embarcaciones/:embarcacionId/asignaciones/:tripulanteId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('embarcacionId') embarcacionId: string, @Param('tripulanteId') tripulanteId: string) {
    return this.service.eliminarAsignacionService(Number(embarcacionId), Number(tripulanteId));
  }
}
