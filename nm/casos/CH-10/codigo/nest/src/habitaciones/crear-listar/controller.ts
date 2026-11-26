import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('habitaciones')
  async ejecutar(@Body() datos: { nombre: string; camas: number; hospitalId: number }) {
    return this.service.crearHabitacionService(datos.nombre, datos.camas, datos.hospitalId);
  }

  @Get('habitaciones')
  listar() {
    return this.service.listarHabitacionesService();
  }
}
