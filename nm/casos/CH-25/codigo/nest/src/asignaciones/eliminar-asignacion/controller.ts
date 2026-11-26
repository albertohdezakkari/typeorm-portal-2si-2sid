import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('programas/:programaId/asignaciones/:locutorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('programaId') programaId: string, @Param('locutorId') locutorId: string) {
    return this.service.eliminarAsignacionService(Number(programaId), Number(locutorId));
  }
}
