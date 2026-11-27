import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { TrayectosService } from './trayectos.service';

@Controller()
export class TrayectosController {
  constructor(private readonly service: TrayectosService) {}

  @Post('trayectos')
  crear(@Body() datos: { nombre: string; distanciaKm: number; estacionId: number }) {
    return this.service.crearTrayecto(datos.nombre, datos.distanciaKm, datos.estacionId);
  }

  @Get('trayectos')
  listar() {
    return this.service.listarTrayectos();
  }

  @Delete('trayectos/:trayectoId')
  @HttpCode(204)
  eliminar(@Param('trayectoId') trayectoId: string) {
    return this.service.eliminarTrayecto(Number(trayectoId));
  }

  @Patch('trayectos/:trayectoId')
  modificar(@Param('trayectoId') trayectoId: string, @Body() datos: { distanciaKm: number }) {
    return this.service.modificarDistanciaKm(Number(trayectoId), datos.distanciaKm);
  }

  @Patch('trayectos/:trayectoId/estacion')
  cambiarEstacion(@Param('trayectoId') trayectoId: string, @Body() datos: { estacionId: number }) {
    return this.service.cambiarEstacion(Number(trayectoId), datos.estacionId);
  }

  @Get('estaciones/:estacionId/trayectos')
  consultar(@Param('estacionId') estacionId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEstacion(Number(estacionId), Number(minimo));
  }
}
