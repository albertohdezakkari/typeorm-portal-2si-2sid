import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestauradoresService } from './service';

@Controller('restauradores')
export class RestauradoresController {
  constructor(private readonly service: RestauradoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearRestauradorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarRestauradoresService();
  }
}
