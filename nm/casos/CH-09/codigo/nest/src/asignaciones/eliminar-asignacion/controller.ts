import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('reparaciones/:reparacionId/asignaciones/:mecanicoId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('reparacionId') reparacionId: string, @Param('mecanicoId') mecanicoId: string) {
    return this.service.eliminarAsignacionService(Number(reparacionId), Number(mecanicoId));
  }
}
