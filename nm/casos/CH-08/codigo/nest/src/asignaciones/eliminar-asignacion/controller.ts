import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('productos/:productoId/asignaciones/:panaderoId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('productoId') productoId: string, @Param('panaderoId') panaderoId: string) {
    return this.service.eliminarAsignacionService(Number(productoId), Number(panaderoId));
  }
}
