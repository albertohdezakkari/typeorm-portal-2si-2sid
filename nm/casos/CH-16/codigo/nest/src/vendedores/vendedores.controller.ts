import { Body, Controller, Get, Post } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';

@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly service: VendedoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearVendedor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarVendedores();
  }
}
