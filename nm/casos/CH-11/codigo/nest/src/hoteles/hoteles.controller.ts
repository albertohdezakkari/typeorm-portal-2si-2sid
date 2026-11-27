/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/hoteles" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Hotel Aurora"}'
curl -i "http://localhost:3000/hoteles"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotelesService } from './hoteles.service';

@Controller('hoteles')
export class HotelesController {
  constructor(private readonly service: HotelesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearHotel(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarHoteles();
  }
}