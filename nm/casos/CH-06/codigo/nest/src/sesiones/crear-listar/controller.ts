import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('sesiones')
  async ejecutar(@Body() datos: { nombre: string; plazas: number; gimnasioId: number }) {
    return this.service.crearSesionService(datos.nombre, datos.plazas, datos.gimnasioId);
  }

  @Get('sesiones')
  listar() {
    return this.service.listarSesionesService();
  }
}
