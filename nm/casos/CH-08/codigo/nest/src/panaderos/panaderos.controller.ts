import { Body, Controller, Get, Post } from '@nestjs/common';
import { PanaderosService } from './panaderos.service';

@Controller('panaderos')
export class PanaderosController {
  constructor(private readonly service: PanaderosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearPanadero(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarPanaderos();
  }
}
