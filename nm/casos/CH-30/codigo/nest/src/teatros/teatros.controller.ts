/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/teatros" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Teatro Aurora"}'
curl -i "http://localhost:3000/teatros"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeatrosService } from './teatros.service';

@Controller('teatros')
export class TeatrosController {
  constructor(private readonly service: TeatrosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearTeatro(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarTeatros();
  }
}