import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutoresService } from './service';

@Controller('autores')
export class AutoresController {
  constructor(private readonly service: AutoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAutorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarAutoresService();
  }
}
