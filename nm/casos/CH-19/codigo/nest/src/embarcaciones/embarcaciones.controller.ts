import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { EmbarcacionesService } from './embarcaciones.service';

@Controller()
export class EmbarcacionesController {
  constructor(private readonly service: EmbarcacionesService) {}

  @Post('embarcaciones')
  crear(@Body() datos: { nombre: string; esloraMetros: number; puertoId: number }) {
    return this.service.crearEmbarcacion(datos.nombre, datos.esloraMetros, datos.puertoId);
  }

  @Get('embarcaciones')
  listar() {
    return this.service.listarEmbarcaciones();
  }

  @Delete('embarcaciones/:embarcacionId')
  @HttpCode(204)
  eliminar(@Param('embarcacionId') embarcacionId: string) {
    return this.service.eliminarEmbarcacion(Number(embarcacionId));
  }

  @Patch('embarcaciones/:embarcacionId')
  modificar(@Param('embarcacionId') embarcacionId: string, @Body() datos: { esloraMetros: number }) {
    return this.service.modificarEsloraMetros(Number(embarcacionId), datos.esloraMetros);
  }

  @Patch('embarcaciones/:embarcacionId/puerto')
  cambiarPuerto(@Param('embarcacionId') embarcacionId: string, @Body() datos: { puertoId: number }) {
    return this.service.cambiarPuerto(Number(embarcacionId), datos.puertoId);
  }

  @Get('puertos/:puertoId/embarcaciones')
  consultar(@Param('puertoId') puertoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarPuerto(Number(puertoId), Number(minimo));
  }
}
