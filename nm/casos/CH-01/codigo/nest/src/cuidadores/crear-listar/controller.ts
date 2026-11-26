import { Body, Controller, Get, Post } from '@nestjs/common';
import { CuidadoresService } from './service';

@Controller('cuidadores')
export class CuidadoresController {
  constructor(private readonly service: CuidadoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearCuidadorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarCuidadoresService();
  }
}
