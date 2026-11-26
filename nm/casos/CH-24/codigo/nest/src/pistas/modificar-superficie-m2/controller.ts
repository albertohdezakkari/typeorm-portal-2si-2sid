import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarSuperficieM2Service } from './service';

@Controller()
export class ModificarSuperficieM2Controller {
  constructor(private readonly service: ModificarSuperficieM2Service) {}

  @Patch('pistas/:pistaId')
  async ejecutar(@Param('pistaId', ParseIntPipe) pistaId: number,
    @Body() datos: { superficieM2: number }) {
    return this.service.modificarSuperficieM2Service(pistaId, datos.superficieM2);
  }
}
