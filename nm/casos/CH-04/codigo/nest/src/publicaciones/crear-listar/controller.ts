import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('publicaciones')
  async ejecutar(@Body() datos: { nombre: string; paginas: number; editorialId: number }) {
    return this.service.crearPublicacionService(datos.nombre, datos.paginas, datos.editorialId);
  }

  @Get('publicaciones')
  listar() {
    return this.service.listarPublicacionesService();
  }
}
