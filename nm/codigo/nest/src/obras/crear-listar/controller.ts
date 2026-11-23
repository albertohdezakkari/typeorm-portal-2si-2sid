import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('obras')
  async ejecutar(@Body() datos: { nombre: string; presupuestoEuros: number; ayuntamientoId: number }) {
    return this.service.crearObraService(datos.nombre, datos.presupuestoEuros, datos.ayuntamientoId);
  }

  @Get('obras')
  listar() {
    return this.service.listarObrasService();
  }
}
