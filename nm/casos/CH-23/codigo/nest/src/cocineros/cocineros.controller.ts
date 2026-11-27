import { Body, Controller, Get, Post } from '@nestjs/common';
import { CocinerosService } from './cocineros.service';

@Controller('cocineros')
export class CocinerosController {
  constructor(private readonly service: CocinerosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearCocinero(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarCocineros();
  }
}
