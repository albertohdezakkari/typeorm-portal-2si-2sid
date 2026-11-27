import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { MuestrasService } from './muestras.service';

@Controller()
export class MuestrasController {
  constructor(private readonly service: MuestrasService) {}

  @Post('muestras')
  crear(@Body() datos: { nombre: string; cantidadMl: number; laboratorioId: number }) {
    return this.service.crearMuestra(datos.nombre, datos.cantidadMl, datos.laboratorioId);
  }

  @Get('muestras')
  listar() {
    return this.service.listarMuestras();
  }

  @Delete('muestras/:muestraId')
  @HttpCode(204)
  eliminar(@Param('muestraId') muestraId: string) {
    return this.service.eliminarMuestra(Number(muestraId));
  }

  @Patch('muestras/:muestraId')
  modificar(@Param('muestraId') muestraId: string, @Body() datos: { cantidadMl: number }) {
    return this.service.modificarCantidadMl(Number(muestraId), datos.cantidadMl);
  }

  @Patch('muestras/:muestraId/laboratorio')
  cambiarLaboratorio(@Param('muestraId') muestraId: string, @Body() datos: { laboratorioId: number }) {
    return this.service.cambiarLaboratorio(Number(muestraId), datos.laboratorioId);
  }

  @Get('laboratorios/:laboratorioId/muestras')
  consultar(@Param('laboratorioId') laboratorioId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarLaboratorio(Number(laboratorioId), Number(minimo));
  }
}
