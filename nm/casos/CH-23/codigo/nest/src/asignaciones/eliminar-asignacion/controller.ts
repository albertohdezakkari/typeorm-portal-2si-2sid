import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('comandas/:comandaId/asignaciones/:cocineroId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('comandaId') comandaId: string, @Param('cocineroId') cocineroId: string) {
    return this.service.eliminarAsignacionService(Number(comandaId), Number(cocineroId));
  }
}
