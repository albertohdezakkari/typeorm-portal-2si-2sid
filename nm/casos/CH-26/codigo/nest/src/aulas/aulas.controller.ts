import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { AulasService } from './aulas.service';

@Controller()
export class AulasController {
  constructor(private readonly service: AulasService) {}

  @Post('aulas')
  crear(@Body() datos: { nombre: string; capacidad: number; escuelaId: number }) {
    return this.service.crearAula(datos.nombre, datos.capacidad, datos.escuelaId);
  }

  @Get('aulas')
  listar() {
    return this.service.listarAulas();
  }

  @Delete('aulas/:aulaId')
  @HttpCode(204)
  eliminar(@Param('aulaId') aulaId: string) {
    return this.service.eliminarAula(Number(aulaId));
  }

  @Patch('aulas/:aulaId')
  modificar(@Param('aulaId') aulaId: string, @Body() datos: { capacidad: number }) {
    return this.service.modificarCapacidad(Number(aulaId), datos.capacidad);
  }

  @Patch('aulas/:aulaId/escuela')
  cambiarEscuela(@Param('aulaId') aulaId: string, @Body() datos: { escuelaId: number }) {
    return this.service.cambiarEscuela(Number(aulaId), datos.escuelaId);
  }

  @Get('escuelas/:escuelaId/aulas')
  consultar(@Param('escuelaId') escuelaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEscuela(Number(escuelaId), Number(minimo));
  }
}
