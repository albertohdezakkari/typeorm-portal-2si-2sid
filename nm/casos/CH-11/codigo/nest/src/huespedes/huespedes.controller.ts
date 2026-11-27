import { Body, Controller, Get, Post } from '@nestjs/common';
import { HuespedesService } from './huespedes.service';

@Controller('huespedes')
export class HuespedesController {
  constructor(private readonly service: HuespedesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearHuesped(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarHuespedes();
  }
}
