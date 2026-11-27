/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/refugios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Refugio Norte"}'
curl -i "http://localhost:3000/refugios"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RefugiosService } from './refugios.service';

@Controller('refugios')
export class RefugiosController {
  constructor(private readonly service: RefugiosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearRefugio(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarRefugios();
  }
}