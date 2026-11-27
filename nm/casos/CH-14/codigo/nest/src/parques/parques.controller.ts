/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/parques" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Parque del Agua"}'
curl -i "http://localhost:3000/parques"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParquesService } from './parques.service';

@Controller('parques')
export class ParquesController {
  constructor(private readonly service: ParquesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearParque(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarParques();
  }
}