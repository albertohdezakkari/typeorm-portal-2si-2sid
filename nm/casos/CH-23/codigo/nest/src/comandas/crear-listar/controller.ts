import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('comandas')
  async ejecutar(@Body() datos: { nombre: string; importeCentimos: number; cafeteriaId: number }) {
    return this.service.crearComandaService(datos.nombre, datos.importeCentimos, datos.cafeteriaId);
  }

  @Get('comandas')
  listar() {
    return this.service.listarComandasService();
  }
}
