import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPlazasService } from './service';

@Controller()
export class ModificarPlazasController {
  constructor(private readonly service: ModificarPlazasService) {}

  @Patch('actividades/:actividadId')
  async ejecutar(@Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() datos: { plazas: number }) {
    return this.service.modificarPlazasService(actividadId, datos.plazas);
  }
}
