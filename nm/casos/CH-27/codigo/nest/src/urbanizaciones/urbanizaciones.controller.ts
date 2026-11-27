/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/urbanizaciones" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Urbanización Jardín"}'
curl -i "http://localhost:3000/urbanizaciones"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrbanizacionesService } from './urbanizaciones.service';

@Controller('urbanizaciones')
export class UrbanizacionesController {
  constructor(private readonly service: UrbanizacionesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearUrbanizacion(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarUrbanizaciones();
  }
}