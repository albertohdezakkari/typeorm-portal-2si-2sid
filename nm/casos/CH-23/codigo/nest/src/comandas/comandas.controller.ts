import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ComandasService } from './comandas.service';

@Controller()
export class ComandasController {
  constructor(private readonly service: ComandasService) {}

  @Post('comandas')
  crear(@Body() datos: { nombre: string; importeCentimos: number; cafeteriaId: number }) {
    return this.service.crearComanda(datos.nombre, datos.importeCentimos, datos.cafeteriaId);
  }

  @Get('comandas')
  listar() {
    return this.service.listarComandas();
  }

  @Delete('comandas/:comandaId')
  @HttpCode(204)
  eliminar(@Param('comandaId') comandaId: string) {
    return this.service.eliminarComanda(Number(comandaId));
  }

  @Patch('comandas/:comandaId')
  modificar(@Param('comandaId') comandaId: string, @Body() datos: { importeCentimos: number }) {
    return this.service.modificarImporteCentimos(Number(comandaId), datos.importeCentimos);
  }

  @Patch('comandas/:comandaId/cafeteria')
  cambiarCafeteria(@Param('comandaId') comandaId: string, @Body() datos: { cafeteriaId: number }) {
    return this.service.cambiarCafeteria(Number(comandaId), datos.cafeteriaId);
  }

  @Get('cafeterias/:cafeteriaId/comandas')
  consultar(@Param('cafeteriaId') cafeteriaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarCafeteria(Number(cafeteriaId), Number(minimo));
  }
}
