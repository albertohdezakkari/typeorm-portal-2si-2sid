import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('aulas/:aulaId/asignaciones')
  asignar(@Param('aulaId') aulaId: string, @Body() datos: { docenteId: number; rol: string }) {
    return this.service.asignarDocente(Number(aulaId), datos.docenteId, datos.rol);
  }

  @Get('aulas/:aulaId/asignaciones')
  listarPorAula(@Param('aulaId') aulaId: string) {
    return this.service.listarPorAula(Number(aulaId));
  }

  @Get('docentes/:docenteId/asignaciones')
  listarPorDocente(@Param('docenteId') docenteId: string) {
    return this.service.listarPorDocente(Number(docenteId));
  }

  @Patch('aulas/:aulaId/asignaciones/:docenteId')
  modificarRol(@Param('aulaId') aulaId: string, @Param('docenteId') docenteId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(aulaId), Number(docenteId), datos.rol);
  }

  @Delete('aulas/:aulaId/asignaciones/:docenteId')
  @HttpCode(204)
  eliminar(@Param('aulaId') aulaId: string, @Param('docenteId') docenteId: string) {
    return this.service.eliminarAsignacion(Number(aulaId), Number(docenteId));
  }
}
