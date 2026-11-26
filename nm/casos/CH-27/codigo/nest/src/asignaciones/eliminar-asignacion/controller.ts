import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('plazas/:plazaId/asignaciones/:tecnicoId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('plazaId') plazaId: string, @Param('tecnicoId') tecnicoId: string) {
    return this.service.eliminarAsignacionService(Number(plazaId), Number(tecnicoId));
  }
}
