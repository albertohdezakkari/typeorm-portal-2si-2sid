import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('vendedores')
  crearVendedor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearVendedor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('vendedores')
  listarVendedores() {
    return this.service.listarVendedores();
  }

  @Post('articulos/:articuloId/asignaciones')
  asignar(@Param('articuloId') articuloId: string, @Body() datos: { vendedorId: number; rol: string }) {
    return this.service.asignarVendedor(Number(articuloId), datos.vendedorId, datos.rol);
  }

  @Get('articulos/:articuloId/asignaciones')
  listarPorArticulo(@Param('articuloId') articuloId: string) {
    return this.service.listarPorArticulo(Number(articuloId));
  }

  @Get('vendedores/:vendedorId/asignaciones')
  listarPorVendedor(@Param('vendedorId') vendedorId: string) {
    return this.service.listarPorVendedor(Number(vendedorId));
  }

  @Patch('articulos/:articuloId/asignaciones/:vendedorId')
  modificarRol(@Param('articuloId') articuloId: string, @Param('vendedorId') vendedorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(articuloId), Number(vendedorId), datos.rol);
  }

  @Delete('articulos/:articuloId/asignaciones/:vendedorId')
  @HttpCode(204)
  eliminar(@Param('articuloId') articuloId: string, @Param('vendedorId') vendedorId: string) {
    return this.service.eliminarAsignacion(Number(articuloId), Number(vendedorId));
  }
}
