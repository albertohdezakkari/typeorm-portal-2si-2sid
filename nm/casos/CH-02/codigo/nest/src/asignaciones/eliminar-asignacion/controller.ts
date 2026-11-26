import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('parcelas/:parcelaId/asignaciones/:cultivadorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('parcelaId') parcelaId: string, @Param('cultivadorId') cultivadorId: string) {
    return this.service.eliminarAsignacionService(Number(parcelaId), Number(cultivadorId));
  }
}
