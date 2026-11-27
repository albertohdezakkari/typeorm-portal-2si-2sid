import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly service: ProfesionalesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearProfesional(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarProfesionales();
  }
}
