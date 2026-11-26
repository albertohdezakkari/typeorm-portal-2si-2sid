import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('documentos/:documentoId/asignaciones/:revisorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('documentoId') documentoId: string, @Param('revisorId') revisorId: string) {
    return this.service.eliminarAsignacionService(Number(documentoId), Number(revisorId));
  }
}
