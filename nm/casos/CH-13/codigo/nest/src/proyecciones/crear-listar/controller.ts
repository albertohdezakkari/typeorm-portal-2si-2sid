import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('proyecciones')
  async ejecutar(@Body() datos: { pelicula: string; duracionMinutos: number; cineId: number }) {
    return this.service.crearProyeccionService(datos.pelicula, datos.duracionMinutos, datos.cineId);
  }

  @Get('proyecciones')
  listar() {
    return this.service.listarProyeccionesService();
  }
}
