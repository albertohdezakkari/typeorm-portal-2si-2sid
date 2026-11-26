import { Body, Controller, Get, Post } from '@nestjs/common';
import { TecnicosService } from './service';

@Controller('tecnicos')
export class TecnicosController {
  constructor(private readonly service: TecnicosService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearTecnicoService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarTecnicosService();
  }
}
