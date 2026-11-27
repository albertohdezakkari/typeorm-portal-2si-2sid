/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/cines" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cine Alameda"}'
curl -i "http://localhost:3000/cines"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinesService } from './cines.service';

@Controller('cines')
export class CinesController {
  constructor(private readonly service: CinesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearCine(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarCines();
  }
}