/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/hospitales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Hospital Central"}'
curl -i "http://localhost:3000/hospitales"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { HospitalesService } from './hospitales.service';

@Controller('hospitales')
export class HospitalesController {
  constructor(private readonly service: HospitalesService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearHospital(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarHospitales();
  }
}