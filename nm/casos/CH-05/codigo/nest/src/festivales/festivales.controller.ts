/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/festivales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Festival del Sol"}'
curl -i "http://localhost:3000/festivales"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { FestivalesService } from './festivales.service';

@Controller('festivales')
export class FestivalesController {
  constructor(private readonly service: FestivalesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearFestival(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarFestivales();
  }
}