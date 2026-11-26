import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarVendedorService } from './service';

@Controller('articulos/:articuloId/asignaciones')
export class AsignarVendedorController {
  constructor(private readonly service: AsignarVendedorService) {}

  @Post()
  asignar(@Param('articuloId') articuloId: string, @Body() datos: { vendedorId: number; rol: string }) {
    return this.service.asignarVendedorService(Number(articuloId), datos.vendedorId, datos.rol);
  }
}
