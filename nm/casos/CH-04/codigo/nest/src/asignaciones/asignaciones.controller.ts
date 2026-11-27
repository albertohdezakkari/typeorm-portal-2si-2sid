import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('autores')
  crearAutor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAutor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('autores')
  listarAutores() {
    return this.service.listarAutores();
  }

  @Post('publicaciones/:publicacionId/asignaciones')
  asignar(@Param('publicacionId') publicacionId: string, @Body() datos: { autorId: number; rol: string }) {
    return this.service.asignarAutor(Number(publicacionId), datos.autorId, datos.rol);
  }

  @Get('publicaciones/:publicacionId/asignaciones')
  listarPorPublicacion(@Param('publicacionId') publicacionId: string) {
    return this.service.listarPorPublicacion(Number(publicacionId));
  }

  @Get('autores/:autorId/asignaciones')
  listarPorAutor(@Param('autorId') autorId: string) {
    return this.service.listarPorAutor(Number(autorId));
  }

  @Patch('publicaciones/:publicacionId/asignaciones/:autorId')
  modificarRol(@Param('publicacionId') publicacionId: string, @Param('autorId') autorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(publicacionId), Number(autorId), datos.rol);
  }

  @Delete('publicaciones/:publicacionId/asignaciones/:autorId')
  @HttpCode(204)
  eliminar(@Param('publicacionId') publicacionId: string, @Param('autorId') autorId: string) {
    return this.service.eliminarAsignacion(Number(publicacionId), Number(autorId));
  }
}
