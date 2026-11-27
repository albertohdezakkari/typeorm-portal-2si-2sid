import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('inspectores')
  crearInspector(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInspector(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('inspectores')
  listarInspectores() {
    return this.service.listarInspectores();
  }

  @Post('lotes/:loteId/asignaciones')
  asignar(@Param('loteId') loteId: string, @Body() datos: { inspectorId: number; rol: string }) {
    return this.service.asignarInspector(Number(loteId), datos.inspectorId, datos.rol);
  }

  @Get('lotes/:loteId/asignaciones')
  listarPorLote(@Param('loteId') loteId: string) {
    return this.service.listarPorLote(Number(loteId));
  }

  @Get('inspectores/:inspectorId/asignaciones')
  listarPorInspector(@Param('inspectorId') inspectorId: string) {
    return this.service.listarPorInspector(Number(inspectorId));
  }

  @Patch('lotes/:loteId/asignaciones/:inspectorId')
  modificarRol(@Param('loteId') loteId: string, @Param('inspectorId') inspectorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(loteId), Number(inspectorId), datos.rol);
  }

  @Delete('lotes/:loteId/asignaciones/:inspectorId')
  @HttpCode(204)
  eliminar(@Param('loteId') loteId: string, @Param('inspectorId') inspectorId: string) {
    return this.service.eliminarAsignacion(Number(loteId), Number(inspectorId));
  }
}
