import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('analistas')
  crearAnalista(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAnalista(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('analistas')
  listarAnalistas() {
    return this.service.listarAnalistas();
  }

  @Post('muestras/:muestraId/asignaciones')
  asignar(@Param('muestraId') muestraId: string, @Body() datos: { analistaId: number; rol: string }) {
    return this.service.asignarAnalista(Number(muestraId), datos.analistaId, datos.rol);
  }

  @Get('muestras/:muestraId/asignaciones')
  listarPorMuestra(@Param('muestraId') muestraId: string) {
    return this.service.listarPorMuestra(Number(muestraId));
  }

  @Get('analistas/:analistaId/asignaciones')
  listarPorAnalista(@Param('analistaId') analistaId: string) {
    return this.service.listarPorAnalista(Number(analistaId));
  }

  @Patch('muestras/:muestraId/asignaciones/:analistaId')
  modificarRol(@Param('muestraId') muestraId: string, @Param('analistaId') analistaId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(muestraId), Number(analistaId), datos.rol);
  }

  @Delete('muestras/:muestraId/asignaciones/:analistaId')
  @HttpCode(204)
  eliminar(@Param('muestraId') muestraId: string, @Param('analistaId') analistaId: string) {
    return this.service.eliminarAsignacion(Number(muestraId), Number(analistaId));
  }
}
