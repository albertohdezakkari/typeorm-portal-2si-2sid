import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('muestras')
  async ejecutar(@Body() datos: { nombre: string; cantidadMl: number; laboratorioId: number }) {
    return this.service.crearMuestraService(datos.nombre, datos.cantidadMl, datos.laboratorioId);
  }

  @Get('muestras')
  listar() {
    return this.service.listarMuestrasService();
  }
}
