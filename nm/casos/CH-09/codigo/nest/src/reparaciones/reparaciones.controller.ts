import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ReparacionesService } from './reparaciones.service';

@Controller()
export class ReparacionesController {
  constructor(private readonly service: ReparacionesService) {}

  @Post('reparaciones')
  crear(@Body() datos: { nombre: string; costeCentimos: number; tallerId: number }) {
    return this.service.crearReparacion(datos.nombre, datos.costeCentimos, datos.tallerId);
  }

  @Get('reparaciones')
  listar() {
    return this.service.listarReparaciones();
  }

  @Delete('reparaciones/:reparacionId')
  @HttpCode(204)
  eliminar(@Param('reparacionId') reparacionId: string) {
    return this.service.eliminarReparacion(Number(reparacionId));
  }

  @Patch('reparaciones/:reparacionId')
  modificar(@Param('reparacionId') reparacionId: string, @Body() datos: { costeCentimos: number }) {
    return this.service.modificarCosteCentimos(Number(reparacionId), datos.costeCentimos);
  }

  @Patch('reparaciones/:reparacionId/taller')
  cambiarTaller(@Param('reparacionId') reparacionId: string, @Body() datos: { tallerId: number }) {
    return this.service.cambiarTaller(Number(reparacionId), datos.tallerId);
  }

  @Get('talleres/:tallerId/reparaciones')
  consultar(@Param('tallerId') tallerId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarTaller(Number(tallerId), Number(minimo));
  }
}
