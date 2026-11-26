import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('publicaciones/:publicacionId/asignaciones/:autorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('publicacionId') publicacionId: string, @Param('autorId') autorId: string) {
    return this.service.eliminarAsignacionService(Number(publicacionId), Number(autorId));
  }
}
