import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgricultoresService } from './service';

@Controller('agricultores')
export class AgricultoresController {
  constructor(private readonly service: AgricultoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAgricultorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarAgricultoresService();
  }
}
