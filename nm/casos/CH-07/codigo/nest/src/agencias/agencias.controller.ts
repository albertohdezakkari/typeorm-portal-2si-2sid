/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/agencias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Agencia Horizonte"}'
curl -i "http://localhost:3000/agencias"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgenciasService } from './agencias.service';

@Controller('agencias')
export class AgenciasController {
  constructor(private readonly service: AgenciasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearAgencia(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarAgencias();
  }
}