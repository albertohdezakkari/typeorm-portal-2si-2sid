import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('proyectos')
  async ejecutar(@Body() datos: { nombre: string; horasEstimadas: number; empresaId: number }) {
    return this.service.crearProyectoService(datos.nombre, datos.horasEstimadas, datos.empresaId);
  }

  @Get('proyectos')
  listar() {
    return this.service.listarProyectosService();
  }
}
