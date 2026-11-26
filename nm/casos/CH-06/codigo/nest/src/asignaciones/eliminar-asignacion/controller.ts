import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('sesiones/:sesionId/asignaciones/:instructorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('sesionId') sesionId: string, @Param('instructorId') instructorId: string) {
    return this.service.eliminarAsignacionService(Number(sesionId), Number(instructorId));
  }
}
