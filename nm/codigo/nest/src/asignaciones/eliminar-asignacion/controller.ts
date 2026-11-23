import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('obras/:obraId/asignaciones/:profesionalId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string) {
    return this.service.eliminarAsignacionService(Number(obraId), Number(profesionalId));
  }
}
