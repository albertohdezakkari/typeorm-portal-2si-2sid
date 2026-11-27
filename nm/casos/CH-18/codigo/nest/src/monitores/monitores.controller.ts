import { Body, Controller, Get, Post } from '@nestjs/common';
import { MonitoresService } from './monitores.service';

@Controller('monitores')
export class MonitoresController {
  constructor(private readonly service: MonitoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearMonitor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarMonitores();
  }
}
