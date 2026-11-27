import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { PlantasService } from './plantas.service';

@Controller()
export class PlantasController {
  constructor(private readonly service: PlantasService) {}

  @Post('plantas')
  crear(@Body() datos: { nombre: string; alturaCm: number; viveroId: number }) {
    return this.service.crearPlanta(datos.nombre, datos.alturaCm, datos.viveroId);
  }

  @Get('plantas')
  listar() {
    return this.service.listarPlantas();
  }

  @Delete('plantas/:plantaId')
  @HttpCode(204)
  eliminar(@Param('plantaId') plantaId: string) {
    return this.service.eliminarPlanta(Number(plantaId));
  }

  @Patch('plantas/:plantaId')
  modificar(@Param('plantaId') plantaId: string, @Body() datos: { alturaCm: number }) {
    return this.service.modificarAlturaCm(Number(plantaId), datos.alturaCm);
  }

  @Patch('plantas/:plantaId/vivero')
  cambiarVivero(@Param('plantaId') plantaId: string, @Body() datos: { viveroId: number }) {
    return this.service.cambiarVivero(Number(plantaId), datos.viveroId);
  }

  @Get('viveros/:viveroId/plantas')
  consultar(@Param('viveroId') viveroId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarVivero(Number(viveroId), Number(minimo));
  }
}
