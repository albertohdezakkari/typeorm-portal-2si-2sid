import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('articulos')
  async ejecutar(@Body() datos: { nombre: string; stock: number; tiendaId: number }) {
    return this.service.crearArticuloService(datos.nombre, datos.stock, datos.tiendaId);
  }

  @Get('articulos')
  listar() {
    return this.service.listarArticulosService();
  }
}
