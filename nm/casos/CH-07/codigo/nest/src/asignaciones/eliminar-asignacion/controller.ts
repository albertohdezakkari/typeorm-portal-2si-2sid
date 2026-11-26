import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('excursiones/:excursionId/asignaciones/:guiaId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('excursionId') excursionId: string, @Param('guiaId') guiaId: string) {
    return this.service.eliminarAsignacionService(Number(excursionId), Number(guiaId));
  }
}
