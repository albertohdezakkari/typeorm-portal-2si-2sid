import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('actores')
  crearActor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearActor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('actores')
  listarActores() {
    return this.service.listarActores();
  }

  @Post('escenas/:escenaId/asignaciones')
  asignar(@Param('escenaId') escenaId: string, @Body() datos: { actorId: number; rol: string }) {
    return this.service.asignarActor(Number(escenaId), datos.actorId, datos.rol);
  }

  @Get('escenas/:escenaId/asignaciones')
  listarPorEscena(@Param('escenaId') escenaId: string) {
    return this.service.listarPorEscena(Number(escenaId));
  }

  @Get('actores/:actorId/asignaciones')
  listarPorActor(@Param('actorId') actorId: string) {
    return this.service.listarPorActor(Number(actorId));
  }

  @Patch('escenas/:escenaId/asignaciones/:actorId')
  modificarRol(@Param('escenaId') escenaId: string, @Param('actorId') actorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(escenaId), Number(actorId), datos.rol);
  }

  @Delete('escenas/:escenaId/asignaciones/:actorId')
  @HttpCode(204)
  eliminar(@Param('escenaId') escenaId: string, @Param('actorId') actorId: string) {
    return this.service.eliminarAsignacion(Number(escenaId), Number(actorId));
  }
}
