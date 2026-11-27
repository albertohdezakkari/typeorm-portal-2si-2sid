/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/complejos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Complejo Municipal"}'
curl -i "http://localhost:3000/complejos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ComplejosService } from './complejos.service';

@Controller('complejos')
export class ComplejosController {
  constructor(private readonly service: ComplejosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearComplejo(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarComplejos();
  }
}