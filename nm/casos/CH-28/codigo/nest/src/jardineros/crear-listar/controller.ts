import { Body, Controller, Get, Post } from '@nestjs/common';
import { JardinerosService } from './service';

@Controller('jardineros')
export class JardinerosController {
  constructor(private readonly service: JardinerosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearJardineroService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarJardinerosService();
  }
}
