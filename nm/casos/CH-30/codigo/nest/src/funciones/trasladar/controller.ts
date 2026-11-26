import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('funciones/:funcionId/teatro')
  async ejecutar(@Param('funcionId', ParseIntPipe) funcionId: number,
    @Body() datos: { teatroId: number }) {
    return this.service.trasladarFuncionService(funcionId, datos.teatroId);
  }
}
