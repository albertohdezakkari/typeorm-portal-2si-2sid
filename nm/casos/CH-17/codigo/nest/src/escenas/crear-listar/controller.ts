import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('escenas')
  async ejecutar(@Body() datos: { nombre: string; duracionSegundos: number; estudioId: number }) {
    return this.service.crearEscenaService(datos.nombre, datos.duracionSegundos, datos.estudioId);
  }

  @Get('escenas')
  listar() {
    return this.service.listarEscenasService();
  }
}
