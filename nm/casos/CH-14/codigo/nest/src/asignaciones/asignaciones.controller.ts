import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('jardineros')
  crearJardinero(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearJardinero(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('jardineros')
  listarJardineros() {
    return this.service.listarJardineros();
  }

  @Post('zonas/:zonaId/asignaciones')
  asignar(@Param('zonaId') zonaId: string, @Body() datos: { jardineroId: number; rol: string }) {
    return this.service.asignarJardinero(Number(zonaId), datos.jardineroId, datos.rol);
  }

  @Get('zonas/:zonaId/asignaciones')
  listarPorZona(@Param('zonaId') zonaId: string) {
    return this.service.listarPorZona(Number(zonaId));
  }

  @Get('jardineros/:jardineroId/asignaciones')
  listarPorJardinero(@Param('jardineroId') jardineroId: string) {
    return this.service.listarPorJardinero(Number(jardineroId));
  }

  @Patch('zonas/:zonaId/asignaciones/:jardineroId')
  modificarRol(@Param('zonaId') zonaId: string, @Param('jardineroId') jardineroId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(zonaId), Number(jardineroId), datos.rol);
  }

  @Delete('zonas/:zonaId/asignaciones/:jardineroId')
  @HttpCode(204)
  eliminar(@Param('zonaId') zonaId: string, @Param('jardineroId') jardineroId: string) {
    return this.service.eliminarAsignacion(Number(zonaId), Number(jardineroId));
  }
}
