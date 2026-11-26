import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('documentos/:documentoId/archivo')
  async ejecutar(@Param('documentoId', ParseIntPipe) documentoId: number,
    @Body() datos: { archivoId: number }) {
    return this.service.trasladarDocumentoService(documentoId, datos.archivoId);
  }
}
