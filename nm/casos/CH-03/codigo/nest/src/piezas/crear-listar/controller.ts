import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('piezas')
  async ejecutar(@Body() datos: { nombre: string; antiguedadAnios: number; museoId: number }) {
    return this.service.crearPiezaService(datos.nombre, datos.antiguedadAnios, datos.museoId);
  }

  @Get('piezas')
  listar() {
    return this.service.listarPiezasService();
  }
}
