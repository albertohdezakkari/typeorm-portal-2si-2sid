import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('excursiones/:excursionId/asignaciones')
  asignar(@Param('excursionId') excursionId: string, @Body() datos: { guiaId: number; rol: string }) {
    return this.service.asignarGuia(Number(excursionId), datos.guiaId, datos.rol);
  }

  @Get('excursiones/:excursionId/asignaciones')
  listarPorExcursion(@Param('excursionId') excursionId: string) {
    return this.service.listarPorExcursion(Number(excursionId));
  }

  @Get('guias/:guiaId/asignaciones')
  listarPorGuia(@Param('guiaId') guiaId: string) {
    return this.service.listarPorGuia(Number(guiaId));
  }

  @Patch('excursiones/:excursionId/asignaciones/:guiaId')
  modificarRol(@Param('excursionId') excursionId: string, @Param('guiaId') guiaId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(excursionId), Number(guiaId), datos.rol);
  }

  @Delete('excursiones/:excursionId/asignaciones/:guiaId')
  @HttpCode(204)
  eliminar(@Param('excursionId') excursionId: string, @Param('guiaId') guiaId: string) {
    return this.service.eliminarAsignacion(Number(excursionId), Number(guiaId));
  }
}
