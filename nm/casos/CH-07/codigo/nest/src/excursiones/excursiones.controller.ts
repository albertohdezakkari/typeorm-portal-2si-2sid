import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ExcursionesService } from './excursiones.service';

@Controller()
export class ExcursionesController {
  constructor(private readonly service: ExcursionesService) {}

  @Post('excursiones')
  crear(@Body() datos: { nombre: string; duracionHoras: number; agenciaId: number }) {
    return this.service.crearExcursion(datos.nombre, datos.duracionHoras, datos.agenciaId);
  }

  @Get('excursiones')
  listar() {
    return this.service.listarExcursiones();
  }

  @Delete('excursiones/:excursionId')
  @HttpCode(204)
  eliminar(@Param('excursionId') excursionId: string) {
    return this.service.eliminarExcursion(Number(excursionId));
  }

  @Patch('excursiones/:excursionId')
  modificar(@Param('excursionId') excursionId: string, @Body() datos: { duracionHoras: number }) {
    return this.service.modificarDuracionHoras(Number(excursionId), datos.duracionHoras);
  }

  @Patch('excursiones/:excursionId/agencia')
  cambiarAgencia(@Param('excursionId') excursionId: string, @Body() datos: { agenciaId: number }) {
    return this.service.cambiarAgencia(Number(excursionId), datos.agenciaId);
  }

  @Get('agencias/:agenciaId/excursiones')
  consultar(@Param('agenciaId') agenciaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarAgencia(Number(agenciaId), Number(minimo));
  }
}
