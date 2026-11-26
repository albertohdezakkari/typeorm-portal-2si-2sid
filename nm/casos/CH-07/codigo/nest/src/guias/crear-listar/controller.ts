import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuiasService } from './service';

@Controller('guias')
export class GuiasController {
  constructor(private readonly service: GuiasService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearGuiaService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarGuiasService();
  }
}
