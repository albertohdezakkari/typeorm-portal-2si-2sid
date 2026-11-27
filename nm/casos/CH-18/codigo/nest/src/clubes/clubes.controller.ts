/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/clubes" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Club Encuentro"}'
curl -i "http://localhost:3000/clubes"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClubesService } from './clubes.service';

@Controller('clubes')
export class ClubesController {
  constructor(private readonly service: ClubesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearClub(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarClubes();
  }
}