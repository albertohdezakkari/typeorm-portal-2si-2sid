import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('plantas/:plantaId/asignaciones')
  asignar(@Param('plantaId') plantaId: string, @Body() datos: { jardineroId: number; rol: string }) {
    return this.service.asignarJardinero(Number(plantaId), datos.jardineroId, datos.rol);
  }

  @Get('plantas/:plantaId/asignaciones')
  listarPorPlanta(@Param('plantaId') plantaId: string) {
    return this.service.listarPorPlanta(Number(plantaId));
  }

  @Get('jardineros/:jardineroId/asignaciones')
  listarPorJardinero(@Param('jardineroId') jardineroId: string) {
    return this.service.listarPorJardinero(Number(jardineroId));
  }

  @Patch('plantas/:plantaId/asignaciones/:jardineroId')
  modificarRol(@Param('plantaId') plantaId: string, @Param('jardineroId') jardineroId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(plantaId), Number(jardineroId), datos.rol);
  }

  @Delete('plantas/:plantaId/asignaciones/:jardineroId')
  @HttpCode(204)
  eliminar(@Param('plantaId') plantaId: string, @Param('jardineroId') jardineroId: string) {
    return this.service.eliminarAsignacion(Number(plantaId), Number(jardineroId));
  }
}
