/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/editoriales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Editorial Roble"}'
curl -i "http://localhost:3000/editoriales"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';

@Controller('editoriales')
export class EditorialesController {
  constructor(private readonly service: EditorialesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEditorial(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEditoriales();
  }
}