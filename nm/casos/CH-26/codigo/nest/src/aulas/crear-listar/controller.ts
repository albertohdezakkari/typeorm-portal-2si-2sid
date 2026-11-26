import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('aulas')
  async ejecutar(@Body() datos: { nombre: string; capacidad: number; escuelaId: number }) {
    return this.service.crearAulaService(datos.nombre, datos.capacidad, datos.escuelaId);
  }

  @Get('aulas')
  listar() {
    return this.service.listarAulasService();
  }
}
