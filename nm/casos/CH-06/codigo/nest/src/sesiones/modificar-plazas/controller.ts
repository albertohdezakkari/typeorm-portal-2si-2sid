import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPlazasService } from './service';

@Controller()
export class ModificarPlazasController {
  constructor(private readonly service: ModificarPlazasService) {}

  @Patch('sesiones/:sesionId')
  async ejecutar(@Param('sesionId', ParseIntPipe) sesionId: number,
    @Body() datos: { plazas: number }) {
    return this.service.modificarPlazasService(sesionId, datos.plazas);
  }
}
