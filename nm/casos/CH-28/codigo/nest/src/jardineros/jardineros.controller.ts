import { Body, Controller, Get, Post } from '@nestjs/common';
import { JardinerosService } from './jardineros.service';

@Controller('jardineros')
export class JardinerosController {
  constructor(private readonly service: JardinerosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearJardinero(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarJardineros();
  }
}
