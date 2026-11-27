import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller()
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Post('productos')
  crear(@Body() datos: { nombre: string; precioCentimos: number; panaderiaId: number }) {
    return this.service.crearProducto(datos.nombre, datos.precioCentimos, datos.panaderiaId);
  }

  @Get('productos')
  listar() {
    return this.service.listarProductos();
  }

  @Delete('productos/:productoId')
  @HttpCode(204)
  eliminar(@Param('productoId') productoId: string) {
    return this.service.eliminarProducto(Number(productoId));
  }

  @Patch('productos/:productoId')
  modificar(@Param('productoId') productoId: string, @Body() datos: { precioCentimos: number }) {
    return this.service.modificarPrecioCentimos(Number(productoId), datos.precioCentimos);
  }

  @Patch('productos/:productoId/panaderia')
  cambiarPanaderia(@Param('productoId') productoId: string, @Body() datos: { panaderiaId: number }) {
    return this.service.cambiarPanaderia(Number(productoId), datos.panaderiaId);
  }

  @Get('panaderias/:panaderiaId/productos')
  consultar(@Param('panaderiaId') panaderiaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarPanaderia(Number(panaderiaId), Number(minimo));
  }
}
