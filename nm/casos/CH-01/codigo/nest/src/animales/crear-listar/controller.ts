import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('animales')
  async ejecutar(@Body() datos: { nombre: string; edadMeses: number; refugioId: number }) {
    return this.service.crearAnimalService(datos.nombre, datos.edadMeses, datos.refugioId);
  }

  @Get('animales')
  listar() {
    return this.service.listarAnimalesService();
  }
}
