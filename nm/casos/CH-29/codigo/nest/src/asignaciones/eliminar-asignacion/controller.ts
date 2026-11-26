import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('cosechas/:cosechaId/asignaciones/:agricultorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('cosechaId') cosechaId: string, @Param('agricultorId') agricultorId: string) {
    return this.service.eliminarAsignacionService(Number(cosechaId), Number(agricultorId));
  }
}
