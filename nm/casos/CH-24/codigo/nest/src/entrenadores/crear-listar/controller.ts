import { Body, Controller, Get, Post } from '@nestjs/common';
import { EntrenadoresService } from './service';

@Controller('entrenadores')
export class EntrenadoresController {
  constructor(private readonly service: EntrenadoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearEntrenadorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarEntrenadoresService();
  }
}
