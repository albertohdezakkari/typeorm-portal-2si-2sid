import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('plantas/:plantaId/asignaciones/:jardineroId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('plantaId') plantaId: string, @Param('jardineroId') jardineroId: string) {
    return this.service.eliminarAsignacionService(Number(plantaId), Number(jardineroId));
  }
}
