import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('programas/:programaId/emisora')
  async ejecutar(@Param('programaId', ParseIntPipe) programaId: number,
    @Body() datos: { emisoraId: number }) {
    return this.service.trasladarProgramaService(programaId, datos.emisoraId);
  }
}
