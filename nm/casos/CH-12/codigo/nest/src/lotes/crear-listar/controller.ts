import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('lotes')
  async ejecutar(@Body() datos: { nombre: string; kilos: number; cooperativaId: number }) {
    return this.service.crearLoteService(datos.nombre, datos.kilos, datos.cooperativaId);
  }

  @Get('lotes')
  listar() {
    return this.service.listarLotesService();
  }
}
