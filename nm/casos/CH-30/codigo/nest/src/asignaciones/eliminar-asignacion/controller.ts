import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('funciones/:funcionId/asignaciones/:interpreteId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('funcionId') funcionId: string, @Param('interpreteId') interpreteId: string) {
    return this.service.eliminarAsignacionService(Number(funcionId), Number(interpreteId));
  }
}
