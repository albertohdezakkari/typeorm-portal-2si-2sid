import { Body, Controller, Get, Post } from '@nestjs/common';
import { CultivadoresService } from './service';

@Controller('cultivadores')
export class CultivadoresController {
  constructor(private readonly service: CultivadoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearCultivadorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarCultivadoresService();
  }
}
