import { Body, Controller, Get, Post } from '@nestjs/common';
import { VendedoresService } from './service';

@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly service: VendedoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearVendedorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarVendedoresService();
  }
}
