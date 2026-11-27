import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnfermerosService } from './enfermeros.service';

@Controller('enfermeros')
export class EnfermerosController {
  constructor(private readonly service: EnfermerosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearEnfermero(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarEnfermeros();
  }
}
