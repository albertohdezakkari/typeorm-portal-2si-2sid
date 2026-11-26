import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('zonas')
  async ejecutar(@Body() datos: { nombre: string; capacidad: number; parqueId: number }) {
    return this.service.crearZonaService(datos.nombre, datos.capacidad, datos.parqueId);
  }

  @Get('zonas')
  listar() {
    return this.service.listarZonasService();
  }
}
