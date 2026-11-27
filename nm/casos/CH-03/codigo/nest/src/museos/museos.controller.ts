/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/museos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Museo del Barrio"}'
curl -i "http://localhost:3000/museos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MuseosService } from './museos.service';

@Controller('museos')
export class MuseosController {
  constructor(private readonly service: MuseosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearMuseo(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarMuseos();
  }
}