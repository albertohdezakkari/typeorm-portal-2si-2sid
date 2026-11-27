/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/ayuntamientos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Ayuntamiento del Río"}'
curl -i "http://localhost:3000/ayuntamientos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AyuntamientosService } from './ayuntamientos.service';

@Controller('ayuntamientos')
export class AyuntamientosController {
  constructor(private readonly service: AyuntamientosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearAyuntamiento(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarAyuntamientos();
  }
}