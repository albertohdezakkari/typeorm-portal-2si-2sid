import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('productos')
  async ejecutar(@Body() datos: { nombre: string; precioCentimos: number; panaderiaId: number }) {
    return this.service.crearProductoService(datos.nombre, datos.precioCentimos, datos.panaderiaId);
  }

  @Get('productos')
  listar() {
    return this.service.listarProductosService();
  }
}
