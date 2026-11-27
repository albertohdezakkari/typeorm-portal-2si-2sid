import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { PlazasService } from './plazas.service';

@Controller()
export class PlazasController {
  constructor(private readonly service: PlazasService) {}

  @Post('plazas')
  crear(@Body() datos: { nombre: string; superficieM2: number; urbanizacionId: number }) {
    return this.service.crearPlaza(datos.nombre, datos.superficieM2, datos.urbanizacionId);
  }

  @Get('plazas')
  listar() {
    return this.service.listarPlazas();
  }

  @Delete('plazas/:plazaId')
  @HttpCode(204)
  eliminar(@Param('plazaId') plazaId: string) {
    return this.service.eliminarPlaza(Number(plazaId));
  }

  @Patch('plazas/:plazaId')
  modificar(@Param('plazaId') plazaId: string, @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieM2(Number(plazaId), datos.superficieM2);
  }

  @Patch('plazas/:plazaId/urbanizacion')
  cambiarUrbanizacion(@Param('plazaId') plazaId: string, @Body() datos: { urbanizacionId: number }) {
    return this.service.cambiarUrbanizacion(Number(plazaId), datos.urbanizacionId);
  }

  @Get('urbanizaciones/:urbanizacionId/plazas')
  consultar(@Param('urbanizacionId') urbanizacionId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarUrbanizacion(Number(urbanizacionId), Number(minimo));
  }
}
