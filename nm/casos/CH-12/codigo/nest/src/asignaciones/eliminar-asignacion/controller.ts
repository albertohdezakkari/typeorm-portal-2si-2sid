import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('lotes/:loteId/asignaciones/:inspectorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('loteId') loteId: string, @Param('inspectorId') inspectorId: string) {
    return this.service.eliminarAsignacionService(Number(loteId), Number(inspectorId));
  }
}
