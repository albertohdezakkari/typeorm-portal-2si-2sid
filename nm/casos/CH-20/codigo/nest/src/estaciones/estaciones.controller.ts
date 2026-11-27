/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/estaciones" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Estación Central"}'
curl -i "http://localhost:3000/estaciones"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstacionesService } from './estaciones.service';

@Controller('estaciones')
export class EstacionesController {
  constructor(private readonly service: EstacionesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEstacion(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEstaciones();
  }
}