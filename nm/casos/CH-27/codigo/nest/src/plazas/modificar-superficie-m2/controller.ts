import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarSuperficieM2Service } from './service';

@Controller()
export class ModificarSuperficieM2Controller {
  constructor(private readonly service: ModificarSuperficieM2Service) {}

  @Patch('plazas/:plazaId')
  async ejecutar(@Param('plazaId', ParseIntPipe) plazaId: number,
    @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieM2Service(plazaId, datos.superficieM2);
  }
}
