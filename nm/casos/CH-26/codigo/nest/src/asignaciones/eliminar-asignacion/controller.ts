import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('aulas/:aulaId/asignaciones/:docenteId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('aulaId') aulaId: string, @Param('docenteId') docenteId: string) {
    return this.service.eliminarAsignacionService(Number(aulaId), Number(docenteId));
  }
}
