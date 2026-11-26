import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPaginasService } from './service';

@Controller()
export class ModificarPaginasController {
  constructor(private readonly service: ModificarPaginasService) {}

  @Patch('documentos/:documentoId')
  async ejecutar(@Param('documentoId', ParseIntPipe) documentoId: number,
    @Body() datos: { paginas: number }) {
    return this.service.modificarPaginasService(documentoId, datos.paginas);
  }
}
