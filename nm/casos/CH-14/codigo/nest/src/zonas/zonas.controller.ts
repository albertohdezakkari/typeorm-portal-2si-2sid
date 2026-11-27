import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ZonasService } from './zonas.service';

@Controller()
export class ZonasController {
  constructor(private readonly service: ZonasService) {}

  @Post('zonas')
  crear(@Body() datos: { nombre: string; capacidad: number; parqueId: number }) {
    return this.service.crearZona(datos.nombre, datos.capacidad, datos.parqueId);
  }

  @Get('zonas')
  listar() {
    return this.service.listarZonas();
  }

  @Delete('zonas/:zonaId')
  @HttpCode(204)
  eliminar(@Param('zonaId') zonaId: string) {
    return this.service.eliminarZona(Number(zonaId));
  }

  @Patch('zonas/:zonaId')
  modificar(@Param('zonaId') zonaId: string, @Body() datos: { capacidad: number }) {
    return this.service.modificarCapacidad(Number(zonaId), datos.capacidad);
  }

  @Patch('zonas/:zonaId/parque')
  cambiarParque(@Param('zonaId') zonaId: string, @Body() datos: { parqueId: number }) {
    return this.service.cambiarParque(Number(zonaId), datos.parqueId);
  }

  @Get('parques/:parqueId/zonas')
  consultar(@Param('parqueId') parqueId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarParque(Number(parqueId), Number(minimo));
  }
}
