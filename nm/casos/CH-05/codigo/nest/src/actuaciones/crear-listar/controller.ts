import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('actuaciones')
  async ejecutar(@Body() datos: { nombre: string; duracionMinutos: number; festivalId: number }) {
    return this.service.crearActuacionService(datos.nombre, datos.duracionMinutos, datos.festivalId);
  }

  @Get('actuaciones')
  listar() {
    return this.service.listarActuacionesService();
  }
}
