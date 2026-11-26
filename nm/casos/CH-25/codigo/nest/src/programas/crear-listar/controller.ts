import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('programas')
  async ejecutar(@Body() datos: { nombre: string; duracionMinutos: number; emisoraId: number }) {
    return this.service.crearProgramaService(datos.nombre, datos.duracionMinutos, datos.emisoraId);
  }

  @Get('programas')
  listar() {
    return this.service.listarProgramasService();
  }
}
