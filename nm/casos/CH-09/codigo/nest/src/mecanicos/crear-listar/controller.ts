import { Body, Controller, Get, Post } from '@nestjs/common';
import { MecanicosService } from './service';

@Controller('mecanicos')
export class MecanicosController {
  constructor(private readonly service: MecanicosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearMecanicoService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarMecanicosService();
  }
}
