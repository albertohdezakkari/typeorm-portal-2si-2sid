import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { PiezasService } from './piezas.service';

@Controller()
export class PiezasController {
  constructor(private readonly service: PiezasService) {}

  @Post('piezas')
  crear(@Body() datos: { nombre: string; antiguedadAnios: number; museoId: number }) {
    return this.service.crearPieza(datos.nombre, datos.antiguedadAnios, datos.museoId);
  }

  @Get('piezas')
  listar() {
    return this.service.listarPiezas();
  }

  @Delete('piezas/:piezaId')
  @HttpCode(204)
  eliminar(@Param('piezaId') piezaId: string) {
    return this.service.eliminarPieza(Number(piezaId));
  }

  @Patch('piezas/:piezaId')
  modificar(@Param('piezaId') piezaId: string, @Body() datos: { antiguedadAnios: number }) {
    return this.service.modificarAntiguedadAnios(Number(piezaId), datos.antiguedadAnios);
  }

  @Patch('piezas/:piezaId/museo')
  cambiarMuseo(@Param('piezaId') piezaId: string, @Body() datos: { museoId: number }) {
    return this.service.cambiarMuseo(Number(piezaId), datos.museoId);
  }

  @Get('museos/:museoId/piezas')
  consultar(@Param('museoId') museoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarMuseo(Number(museoId), Number(minimo));
  }
}
