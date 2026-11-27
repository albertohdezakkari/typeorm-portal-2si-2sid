import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ArticulosService } from './articulos.service';

@Controller()
export class ArticulosController {
  constructor(private readonly service: ArticulosService) {}

  @Post('articulos')
  crear(@Body() datos: { nombre: string; stock: number; tiendaId: number }) {
    return this.service.crearArticulo(datos.nombre, datos.stock, datos.tiendaId);
  }

  @Get('articulos')
  listar() {
    return this.service.listarArticulos();
  }

  @Delete('articulos/:articuloId')
  @HttpCode(204)
  eliminar(@Param('articuloId') articuloId: string) {
    return this.service.eliminarArticulo(Number(articuloId));
  }

  @Patch('articulos/:articuloId')
  modificar(@Param('articuloId') articuloId: string, @Body() datos: { stock: number }) {
    return this.service.modificarStock(Number(articuloId), datos.stock);
  }

  @Patch('articulos/:articuloId/tienda')
  cambiarTienda(@Param('articuloId') articuloId: string, @Body() datos: { tiendaId: number }) {
    return this.service.cambiarTienda(Number(articuloId), datos.tiendaId);
  }

  @Get('tiendas/:tiendaId/articulos')
  consultar(@Param('tiendaId') tiendaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarTienda(Number(tiendaId), Number(minimo));
  }
}
