/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/talleres" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Taller Norte"}'
curl -i "http://localhost:3000/talleres"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TalleresService } from './talleres.service';

@Controller('talleres')
export class TalleresController {
  constructor(private readonly service: TalleresService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearTaller(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarTalleres();
  }
}