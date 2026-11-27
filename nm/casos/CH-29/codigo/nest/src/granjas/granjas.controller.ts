/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/granjas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Granja del Sol"}'
curl -i "http://localhost:3000/granjas"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GranjasService } from './granjas.service';

@Controller('granjas')
export class GranjasController {
  constructor(private readonly service: GranjasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearGranja(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarGranjas();
  }
}