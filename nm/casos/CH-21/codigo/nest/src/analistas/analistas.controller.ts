import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalistasService } from './analistas.service';

@Controller('analistas')
export class AnalistasController {
  constructor(private readonly service: AnalistasService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAnalista(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarAnalistas();
  }
}
