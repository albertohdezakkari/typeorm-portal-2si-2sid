/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/laboratorios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Laboratorio Azul"}'
curl -i "http://localhost:3000/laboratorios"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LaboratoriosService } from './laboratorios.service';

@Controller('laboratorios')
export class LaboratoriosController {
  constructor(private readonly service: LaboratoriosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearLaboratorio(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarLaboratorios();
  }
}