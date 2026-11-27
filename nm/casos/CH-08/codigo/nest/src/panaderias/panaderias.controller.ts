/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/panaderias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Panadería Espiga"}'
curl -i "http://localhost:3000/panaderias"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PanaderiasService } from './panaderias.service';

@Controller('panaderias')
export class PanaderiasController {
  constructor(private readonly service: PanaderiasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearPanaderia(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarPanaderias();
  }
}