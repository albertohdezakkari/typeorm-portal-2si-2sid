/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/viveros" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Vivero Raíz"}'
curl -i "http://localhost:3000/viveros"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ViverosService } from './viveros.service';

@Controller('viveros')
export class ViverosController {
  constructor(private readonly service: ViverosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearVivero(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarViveros();
  }
}