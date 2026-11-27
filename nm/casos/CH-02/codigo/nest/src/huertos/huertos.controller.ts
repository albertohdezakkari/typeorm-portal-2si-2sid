/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/huertos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Huerto del Río"}'
curl -i "http://localhost:3000/huertos"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { HuertosService } from './huertos.service';

@Controller('huertos')
export class HuertosController {
  constructor(private readonly service: HuertosService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearHuerto(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarHuertos();
  }
}