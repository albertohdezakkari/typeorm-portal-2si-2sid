import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { SesionesService } from './sesiones.service';

@Controller()
export class SesionesController {
  constructor(private readonly service: SesionesService) {}

  @Post('sesiones')
  crear(@Body() datos: { nombre: string; plazas: number; gimnasioId: number }) {
    return this.service.crearSesion(datos.nombre, datos.plazas, datos.gimnasioId);
  }

  @Get('sesiones')
  listar() {
    return this.service.listarSesiones();
  }

  @Delete('sesiones/:sesionId')
  @HttpCode(204)
  eliminar(@Param('sesionId') sesionId: string) {
    return this.service.eliminarSesion(Number(sesionId));
  }

  @Patch('sesiones/:sesionId')
  modificar(@Param('sesionId') sesionId: string, @Body() datos: { plazas: number }) {
    return this.service.modificarPlazas(Number(sesionId), datos.plazas);
  }

  @Patch('sesiones/:sesionId/gimnasio')
  cambiarGimnasio(@Param('sesionId') sesionId: string, @Body() datos: { gimnasioId: number }) {
    return this.service.cambiarGimnasio(Number(sesionId), datos.gimnasioId);
  }

  @Get('gimnasios/:gimnasioId/sesiones')
  consultar(@Param('gimnasioId') gimnasioId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarGimnasio(Number(gimnasioId), Number(minimo));
  }
}
