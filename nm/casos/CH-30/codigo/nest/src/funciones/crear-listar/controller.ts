import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('funciones')
  async ejecutar(@Body() datos: { nombre: string; aforo: number; teatroId: number }) {
    return this.service.crearFuncionService(datos.nombre, datos.aforo, datos.teatroId);
  }

  @Get('funciones')
  listar() {
    return this.service.listarFuncionesService();
  }
}
