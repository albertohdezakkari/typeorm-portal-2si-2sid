import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('plazas')
  async ejecutar(@Body() datos: { nombre: string; superficieM2: number; urbanizacionId: number }) {
    return this.service.crearPlazaService(datos.nombre, datos.superficieM2, datos.urbanizacionId);
  }

  @Get('plazas')
  listar() {
    return this.service.listarPlazasService();
  }
}
