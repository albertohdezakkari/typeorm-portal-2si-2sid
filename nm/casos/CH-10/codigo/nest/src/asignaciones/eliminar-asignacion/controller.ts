import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('habitaciones/:habitacionId/asignaciones/:enfermeroId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('habitacionId') habitacionId: string, @Param('enfermeroId') enfermeroId: string) {
    return this.service.eliminarAsignacionService(Number(habitacionId), Number(enfermeroId));
  }
}
