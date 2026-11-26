import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('actuaciones/:actuacionId/asignaciones/:artistaId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('actuacionId') actuacionId: string, @Param('artistaId') artistaId: string) {
    return this.service.eliminarAsignacionService(Number(actuacionId), Number(artistaId));
  }
}
