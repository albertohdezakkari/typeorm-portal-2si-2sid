import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('proyecciones/:proyeccionId/asignaciones/:tecnicoId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('proyeccionId') proyeccionId: string, @Param('tecnicoId') tecnicoId: string) {
    return this.service.eliminarAsignacionService(Number(proyeccionId), Number(tecnicoId));
  }
}
