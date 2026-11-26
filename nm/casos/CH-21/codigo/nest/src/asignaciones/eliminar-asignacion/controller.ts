import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('muestras/:muestraId/asignaciones/:analistaId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('muestraId') muestraId: string, @Param('analistaId') analistaId: string) {
    return this.service.eliminarAsignacionService(Number(muestraId), Number(analistaId));
  }
}
