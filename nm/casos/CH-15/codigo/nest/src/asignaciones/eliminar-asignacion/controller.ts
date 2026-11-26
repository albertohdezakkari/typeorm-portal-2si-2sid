import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('proyectos/:proyectoId/asignaciones/:colaboradorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('proyectoId') proyectoId: string, @Param('colaboradorId') colaboradorId: string) {
    return this.service.eliminarAsignacionService(Number(proyectoId), Number(colaboradorId));
  }
}
