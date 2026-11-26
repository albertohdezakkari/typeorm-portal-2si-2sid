import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('zonas/:zonaId/asignaciones/:jardineroId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('zonaId') zonaId: string, @Param('jardineroId') jardineroId: string) {
    return this.service.eliminarAsignacionService(Number(zonaId), Number(jardineroId));
  }
}
