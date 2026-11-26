import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('parcelas')
  async ejecutar(@Body() datos: { nombre: string; superficieM2: number; huertoId: number }) {
    return this.service.crearParcelaService(datos.nombre, datos.superficieM2, datos.huertoId);
  }

  @Get('parcelas')
  listar() {
    return this.service.listarParcelasService();
  }
}
