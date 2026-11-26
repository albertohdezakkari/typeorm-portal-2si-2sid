import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('documentos/:documentoId')
  @HttpCode(204)
  async ejecutar(@Param('documentoId', ParseIntPipe) documentoId: number) {
    return this.service.eliminarDocumentoService(documentoId);
  }
}
