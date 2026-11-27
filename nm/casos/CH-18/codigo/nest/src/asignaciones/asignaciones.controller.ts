import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('monitores')
  crearMonitor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearMonitor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('monitores')
  listarMonitores() {
    return this.service.listarMonitores();
  }

  @Post('actividades/:actividadId/asignaciones')
  asignar(@Param('actividadId') actividadId: string, @Body() datos: { monitorId: number; rol: string }) {
    return this.service.asignarMonitor(Number(actividadId), datos.monitorId, datos.rol);
  }

  @Get('actividades/:actividadId/asignaciones')
  listarPorActividad(@Param('actividadId') actividadId: string) {
    return this.service.listarPorActividad(Number(actividadId));
  }

  @Get('monitores/:monitorId/asignaciones')
  listarPorMonitor(@Param('monitorId') monitorId: string) {
    return this.service.listarPorMonitor(Number(monitorId));
  }

  @Patch('actividades/:actividadId/asignaciones/:monitorId')
  modificarRol(@Param('actividadId') actividadId: string, @Param('monitorId') monitorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(actividadId), Number(monitorId), datos.rol);
  }

  @Delete('actividades/:actividadId/asignaciones/:monitorId')
  @HttpCode(204)
  eliminar(@Param('actividadId') actividadId: string, @Param('monitorId') monitorId: string) {
    return this.service.eliminarAsignacion(Number(actividadId), Number(monitorId));
  }
}
