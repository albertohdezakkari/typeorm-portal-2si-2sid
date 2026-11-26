import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColaboradoresService } from './service';

@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly service: ColaboradoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearColaboradorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarColaboradoresService();
  }
}
