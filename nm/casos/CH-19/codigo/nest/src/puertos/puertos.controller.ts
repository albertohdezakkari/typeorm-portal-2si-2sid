/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/puertos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Puerto del Mar"}'
curl -i "http://localhost:3000/puertos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PuertosService } from './puertos.service';

@Controller('puertos')
export class PuertosController {
  constructor(private readonly service: PuertosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearPuerto(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarPuertos();
  }
}