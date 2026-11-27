import { Body, Controller, Get, Post } from '@nestjs/common';
import { InterpretesService } from './interpretes.service';

@Controller('interpretes')
export class InterpretesController {
  constructor(private readonly service: InterpretesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInterprete(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarInterpretes();
  }
}
