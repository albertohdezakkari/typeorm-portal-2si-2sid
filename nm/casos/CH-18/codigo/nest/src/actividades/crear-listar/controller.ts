import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('actividades')
  async ejecutar(@Body() datos: { nombre: string; plazas: number; clubId: number }) {
    return this.service.crearActividadService(datos.nombre, datos.plazas, datos.clubId);
  }

  @Get('actividades')
  listar() {
    return this.service.listarActividadesService();
  }
}
