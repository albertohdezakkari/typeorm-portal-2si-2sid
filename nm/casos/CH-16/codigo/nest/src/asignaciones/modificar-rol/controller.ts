import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('articulos/:articuloId/asignaciones/:vendedorId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('articuloId') articuloId: string, @Param('vendedorId') vendedorId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(articuloId), Number(vendedorId), datos.rol);
  }
}
