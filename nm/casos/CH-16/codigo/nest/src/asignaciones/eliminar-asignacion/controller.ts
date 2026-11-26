import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('articulos/:articuloId/asignaciones/:vendedorId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('articuloId') articuloId: string, @Param('vendedorId') vendedorId: string) {
    return this.service.eliminarAsignacionService(Number(articuloId), Number(vendedorId));
  }
}
