import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocentesService } from './service';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly service: DocentesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearDocenteService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarDocentesService();
  }
}
