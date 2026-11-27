import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ActividadesService } from './actividades.service';

@Controller()
export class ActividadesController {
  constructor(private readonly service: ActividadesService) {}

  @Post('actividades')
  crear(@Body() datos: { nombre: string; plazas: number; clubId: number }) {
    return this.service.crearActividad(datos.nombre, datos.plazas, datos.clubId);
  }

  @Get('actividades')
  listar() {
    return this.service.listarActividades();
  }

  @Delete('actividades/:actividadId')
  @HttpCode(204)
  eliminar(@Param('actividadId') actividadId: string) {
    return this.service.eliminarActividad(Number(actividadId));
  }

  @Patch('actividades/:actividadId')
  modificar(@Param('actividadId') actividadId: string, @Body() datos: { plazas: number }) {
    return this.service.modificarPlazas(Number(actividadId), datos.plazas);
  }

  @Patch('actividades/:actividadId/club')
  cambiarClub(@Param('actividadId') actividadId: string, @Body() datos: { clubId: number }) {
    return this.service.cambiarClub(Number(actividadId), datos.clubId);
  }

  @Get('clubes/:clubId/actividades')
  consultar(@Param('clubId') clubId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarClub(Number(clubId), Number(minimo));
  }
}
