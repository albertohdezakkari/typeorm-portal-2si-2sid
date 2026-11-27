/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/estudios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Estudio Prisma"}'
curl -i "http://localhost:3000/estudios"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstudiosService } from './estudios.service';

@Controller('estudios')
export class EstudiosController {
  constructor(private readonly service: EstudiosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEstudio(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEstudios();
  }
}