import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('reservas')
  async ejecutar(@Body() datos: { nombre: string; noches: number; hotelId: number }) {
    return this.service.crearReservaService(datos.nombre, datos.noches, datos.hotelId);
  }

  @Get('reservas')
  listar() {
    return this.service.listarReservasService();
  }
}
