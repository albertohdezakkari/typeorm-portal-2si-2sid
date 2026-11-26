import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarAforoService } from './service';

@Controller()
export class ModificarAforoController {
  constructor(private readonly service: ModificarAforoService) {}

  @Patch('funciones/:funcionId')
  async ejecutar(@Param('funcionId', ParseIntPipe) funcionId: number,
    @Body() datos: { aforo: number }) {
    return this.service.modificarAforoService(funcionId, datos.aforo);
  }
}
