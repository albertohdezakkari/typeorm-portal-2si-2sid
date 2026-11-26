import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarImporteCentimosService } from './service';

@Controller()
export class ModificarImporteCentimosController {
  constructor(private readonly service: ModificarImporteCentimosService) {}

  @Patch('comandas/:comandaId')
  async ejecutar(@Param('comandaId', ParseIntPipe) comandaId: number,
    @Body() datos: { importeCentimos: number }) {
    return this.service.modificarImporteCentimosService(comandaId, datos.importeCentimos);
  }
}
