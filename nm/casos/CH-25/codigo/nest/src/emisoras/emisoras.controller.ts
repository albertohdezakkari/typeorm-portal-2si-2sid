/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/emisoras" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Radio Horizonte"}'
curl -i "http://localhost:3000/emisoras"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmisorasService } from './emisoras.service';

@Controller('emisoras')
export class EmisorasController {
  constructor(private readonly service: EmisorasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEmisora(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEmisoras();
  }
}