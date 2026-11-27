/* Terminal 2 · Nest abierto en Terminal 1
curl -i -X POST "http://localhost:3000/empresas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Empresa Brújula"}'
curl -i "http://localhost:3000/empresas"
*/
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Post()
  crear(@Body() datos: { nombre: string }) {
    return this.service.crearEmpresa(datos.nombre);
  }

  @Get()
  listar() {
    return this.service.listarEmpresas();
  }
}