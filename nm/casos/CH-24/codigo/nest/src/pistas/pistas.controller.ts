import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { PistasService } from './pistas.service';

@Controller()
export class PistasController {
  constructor(private readonly service: PistasService) {}

  @Post('pistas')
  crear(@Body() datos: { nombre: string; superficieM2: number; complejoId: number }) {
    return this.service.crearPista(datos.nombre, datos.superficieM2, datos.complejoId);
  }

  @Get('pistas')
  listar() {
    return this.service.listarPistas();
  }

  @Delete('pistas/:pistaId')
  @HttpCode(204)
  eliminar(@Param('pistaId') pistaId: string) {
    return this.service.eliminarPista(Number(pistaId));
  }

  @Patch('pistas/:pistaId')
  modificar(@Param('pistaId') pistaId: string, @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieM2(Number(pistaId), datos.superficieM2);
  }

  @Patch('pistas/:pistaId/complejo')
  cambiarComplejo(@Param('pistaId') pistaId: string, @Body() datos: { complejoId: number }) {
    return this.service.cambiarComplejo(Number(pistaId), datos.complejoId);
  }

  @Get('complejos/:complejoId/pistas')
  consultar(@Param('complejoId') complejoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarComplejo(Number(complejoId), Number(minimo));
  }
}
