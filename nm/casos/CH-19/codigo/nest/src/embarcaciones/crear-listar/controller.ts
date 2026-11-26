import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('embarcaciones')
  async ejecutar(@Body() datos: { nombre: string; esloraMetros: number; puertoId: number }) {
    return this.service.crearEmbarcacionService(datos.nombre, datos.esloraMetros, datos.puertoId);
  }

  @Get('embarcaciones')
  listar() {
    return this.service.listarEmbarcacionesService();
  }
}
