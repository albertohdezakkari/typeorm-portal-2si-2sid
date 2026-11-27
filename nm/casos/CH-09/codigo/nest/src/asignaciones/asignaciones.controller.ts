import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('mecanicos')
  crearMecanico(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearMecanico(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('mecanicos')
  listarMecanicos() {
    return this.service.listarMecanicos();
  }

  @Post('reparaciones/:reparacionId/asignaciones')
  asignar(@Param('reparacionId') reparacionId: string, @Body() datos: { mecanicoId: number; rol: string }) {
    return this.service.asignarMecanico(Number(reparacionId), datos.mecanicoId, datos.rol);
  }

  @Get('reparaciones/:reparacionId/asignaciones')
  listarPorReparacion(@Param('reparacionId') reparacionId: string) {
    return this.service.listarPorReparacion(Number(reparacionId));
  }

  @Get('mecanicos/:mecanicoId/asignaciones')
  listarPorMecanico(@Param('mecanicoId') mecanicoId: string) {
    return this.service.listarPorMecanico(Number(mecanicoId));
  }

  @Patch('reparaciones/:reparacionId/asignaciones/:mecanicoId')
  modificarRol(@Param('reparacionId') reparacionId: string, @Param('mecanicoId') mecanicoId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(reparacionId), Number(mecanicoId), datos.rol);
  }

  @Delete('reparaciones/:reparacionId/asignaciones/:mecanicoId')
  @HttpCode(204)
  eliminar(@Param('reparacionId') reparacionId: string, @Param('mecanicoId') mecanicoId: string) {
    return this.service.eliminarAsignacion(Number(reparacionId), Number(mecanicoId));
  }
}
