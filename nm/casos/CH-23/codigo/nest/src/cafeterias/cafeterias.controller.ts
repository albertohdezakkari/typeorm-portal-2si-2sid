/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/cafeterias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cafetería Plaza"}'
curl -i "http://localhost:3000/cafeterias"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CafeteriasService } from './cafeterias.service';

@Controller('cafeterias')
export class CafeteriasController {
  constructor(private readonly service: CafeteriasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearCafeteria(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarCafeterias();
  }
}