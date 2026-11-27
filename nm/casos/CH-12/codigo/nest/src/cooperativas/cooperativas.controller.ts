/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/cooperativas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cooperativa Olivo"}'
curl -i "http://localhost:3000/cooperativas"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CooperativasService } from './cooperativas.service';

@Controller('cooperativas')
export class CooperativasController {
  constructor(private readonly service: CooperativasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearCooperativa(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarCooperativas();
  }
}