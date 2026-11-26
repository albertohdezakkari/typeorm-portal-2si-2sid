import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripulantesService } from './service';

@Controller('tripulantes')
export class TripulantesController {
  constructor(private readonly service: TripulantesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearTripulanteService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarTripulantesService();
  }
}
