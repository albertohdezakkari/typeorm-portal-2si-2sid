import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('reparaciones')
  async ejecutar(@Body() datos: { nombre: string; costeCentimos: number; tallerId: number }) {
    return this.service.crearReparacionService(datos.nombre, datos.costeCentimos, datos.tallerId);
  }

  @Get('reparaciones')
  listar() {
    return this.service.listarReparacionesService();
  }
}
