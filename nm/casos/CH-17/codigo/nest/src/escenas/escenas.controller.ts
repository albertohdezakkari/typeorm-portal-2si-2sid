import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { EscenasService } from './escenas.service';

@Controller()
export class EscenasController {
  constructor(private readonly service: EscenasService) {}

  @Post('escenas')
  crear(@Body() datos: { nombre: string; duracionSegundos: number; estudioId: number }) {
    return this.service.crearEscena(datos.nombre, datos.duracionSegundos, datos.estudioId);
  }

  @Get('escenas')
  listar() {
    return this.service.listarEscenas();
  }

  @Delete('escenas/:escenaId')
  @HttpCode(204)
  eliminar(@Param('escenaId') escenaId: string) {
    return this.service.eliminarEscena(Number(escenaId));
  }

  @Patch('escenas/:escenaId')
  modificar(@Param('escenaId') escenaId: string, @Body() datos: { duracionSegundos: number }) {
    return this.service.modificarDuracionSegundos(Number(escenaId), datos.duracionSegundos);
  }

  @Patch('escenas/:escenaId/estudio')
  cambiarEstudio(@Param('escenaId') escenaId: string, @Body() datos: { estudioId: number }) {
    return this.service.cambiarEstudio(Number(escenaId), datos.estudioId);
  }

  @Get('estudios/:estudioId/escenas')
  consultar(@Param('estudioId') estudioId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEstudio(Number(estudioId), Number(minimo));
  }
}
