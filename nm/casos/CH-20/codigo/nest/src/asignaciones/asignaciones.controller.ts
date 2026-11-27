import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('conductores')
  crearConductor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearConductor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('conductores')
  listarConductores() {
    return this.service.listarConductores();
  }

  @Post('trayectos/:trayectoId/asignaciones')
  asignar(@Param('trayectoId') trayectoId: string, @Body() datos: { conductorId: number; rol: string }) {
    return this.service.asignarConductor(Number(trayectoId), datos.conductorId, datos.rol);
  }

  @Get('trayectos/:trayectoId/asignaciones')
  listarPorTrayecto(@Param('trayectoId') trayectoId: string) {
    return this.service.listarPorTrayecto(Number(trayectoId));
  }

  @Get('conductores/:conductorId/asignaciones')
  listarPorConductor(@Param('conductorId') conductorId: string) {
    return this.service.listarPorConductor(Number(conductorId));
  }

  @Patch('trayectos/:trayectoId/asignaciones/:conductorId')
  modificarRol(@Param('trayectoId') trayectoId: string, @Param('conductorId') conductorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(trayectoId), Number(conductorId), datos.rol);
  }

  @Delete('trayectos/:trayectoId/asignaciones/:conductorId')
  @HttpCode(204)
  eliminar(@Param('trayectoId') trayectoId: string, @Param('conductorId') conductorId: string) {
    return this.service.eliminarAsignacion(Number(trayectoId), Number(conductorId));
  }
}
