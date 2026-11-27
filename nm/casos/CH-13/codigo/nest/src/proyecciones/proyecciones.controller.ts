import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ProyeccionesService } from './proyecciones.service';

@Controller()
export class ProyeccionesController {
  constructor(private readonly service: ProyeccionesService) {}

  @Post('proyecciones')
  crear(@Body() datos: { pelicula: string; duracionMinutos: number; cineId: number }) {
    return this.service.crearProyeccion(datos.pelicula, datos.duracionMinutos, datos.cineId);
  }

  @Get('proyecciones')
  listar() {
    return this.service.listarProyecciones();
  }

  @Delete('proyecciones/:proyeccionId')
  @HttpCode(204)
  eliminar(@Param('proyeccionId') proyeccionId: string) {
    return this.service.eliminarProyeccion(Number(proyeccionId));
  }

  @Patch('proyecciones/:proyeccionId')
  modificar(@Param('proyeccionId') proyeccionId: string, @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutos(Number(proyeccionId), datos.duracionMinutos);
  }

  @Patch('proyecciones/:proyeccionId/cine')
  cambiarCine(@Param('proyeccionId') proyeccionId: string, @Body() datos: { cineId: number }) {
    return this.service.cambiarCine(Number(proyeccionId), datos.cineId);
  }

  @Get('cines/:cineId/proyecciones')
  consultar(@Param('cineId') cineId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarCine(Number(cineId), Number(minimo));
  }
}
