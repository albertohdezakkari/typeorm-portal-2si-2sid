import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { FuncionesService } from './funciones.service';

@Controller()
export class FuncionesController {
  constructor(private readonly service: FuncionesService) {}

  @Post('funciones')
  crear(@Body() datos: { nombre: string; aforo: number; teatroId: number }) {
    return this.service.crearFuncion(datos.nombre, datos.aforo, datos.teatroId);
  }

  @Get('funciones')
  listar() {
    return this.service.listarFunciones();
  }

  @Delete('funciones/:funcionId')
  @HttpCode(204)
  eliminar(@Param('funcionId') funcionId: string) {
    return this.service.eliminarFuncion(Number(funcionId));
  }

  @Patch('funciones/:funcionId')
  modificar(@Param('funcionId') funcionId: string, @Body() datos: { aforo: number }) {
    return this.service.modificarAforo(Number(funcionId), datos.aforo);
  }

  @Patch('funciones/:funcionId/teatro')
  cambiarTeatro(@Param('funcionId') funcionId: string, @Body() datos: { teatroId: number }) {
    return this.service.cambiarTeatro(Number(funcionId), datos.teatroId);
  }

  @Get('teatros/:teatroId/funciones')
  consultar(@Param('teatroId') teatroId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarTeatro(Number(teatroId), Number(minimo));
  }
}
