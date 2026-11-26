import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('reservas/:reservaId/asignaciones/:huespedId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('reservaId') reservaId: string, @Param('huespedId') huespedId: string) {
    return this.service.eliminarAsignacionService(Number(reservaId), Number(huespedId));
  }
}
