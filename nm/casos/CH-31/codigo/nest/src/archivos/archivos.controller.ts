/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/archivos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Archivo Municipal"}'
curl -i "http://localhost:3000/archivos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArchivosService } from './archivos.service';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly service: ArchivosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearArchivo(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarArchivos();
  }
}