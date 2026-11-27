import { Body, Controller, Get, Post } from '@nestjs/common';
import { InstructoresService } from './instructores.service';

@Controller('instructores')
export class InstructoresController {
  constructor(private readonly service: InstructoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInstructor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarInstructores();
  }
}
