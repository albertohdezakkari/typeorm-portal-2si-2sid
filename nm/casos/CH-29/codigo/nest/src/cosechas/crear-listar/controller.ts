import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('cosechas')
  async ejecutar(@Body() datos: { nombre: string; kilos: number; granjaId: number }) {
    return this.service.crearCosechaService(datos.nombre, datos.kilos, datos.granjaId);
  }

  @Get('cosechas')
  listar() {
    return this.service.listarCosechasService();
  }
}
