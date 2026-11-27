/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/tiendas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Tienda Esquina"}'
curl -i "http://localhost:3000/tiendas"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TiendasService } from './tiendas.service';

@Controller('tiendas')
export class TiendasController {
  constructor(private readonly service: TiendasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearTienda(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarTiendas();
  }
}