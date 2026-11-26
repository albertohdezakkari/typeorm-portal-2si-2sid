import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('piezas/:piezaId/asignaciones/:restauradorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('piezaId') piezaId: string, @Param('restauradorId') restauradorId: string) {
    return this.service.eliminarAsignacionService(Number(piezaId), Number(restauradorId));
  }
}
