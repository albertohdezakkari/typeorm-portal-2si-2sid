import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('plantas')
  async ejecutar(@Body() datos: { nombre: string; alturaCm: number; viveroId: number }) {
    return this.service.crearPlantaService(datos.nombre, datos.alturaCm, datos.viveroId);
  }

  @Get('plantas')
  listar() {
    return this.service.listarPlantasService();
  }
}
