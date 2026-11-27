/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/escuelas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Escuela Puente"}'
curl -i "http://localhost:3000/escuelas"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EscuelasService } from './escuelas.service';

@Controller('escuelas')
export class EscuelasController {
  constructor(private readonly service: EscuelasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEscuela(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEscuelas();
  }
}