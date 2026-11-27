/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/gimnasios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Gimnasio Norte"}'
curl -i "http://localhost:3000/gimnasios"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GimnasiosService } from './gimnasios.service';

@Controller('gimnasios')
export class GimnasiosController {
  constructor(private readonly service: GimnasiosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearGimnasio(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarGimnasios();
  }
}