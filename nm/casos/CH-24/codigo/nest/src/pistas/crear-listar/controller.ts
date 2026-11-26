import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('pistas')
  async ejecutar(@Body() datos: { nombre: string; superficieM2: number; complejoId: number }) {
    return this.service.crearPistaService(datos.nombre, datos.superficieM2, datos.complejoId);
  }

  @Get('pistas')
  listar() {
    return this.service.listarPistasService();
  }
}
