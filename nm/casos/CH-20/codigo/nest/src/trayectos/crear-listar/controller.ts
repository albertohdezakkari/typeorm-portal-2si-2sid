import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('trayectos')
  async ejecutar(@Body() datos: { nombre: string; distanciaKm: number; estacionId: number }) {
    return this.service.crearTrayectoService(datos.nombre, datos.distanciaKm, datos.estacionId);
  }

  @Get('trayectos')
  listar() {
    return this.service.listarTrayectosService();
  }
}
