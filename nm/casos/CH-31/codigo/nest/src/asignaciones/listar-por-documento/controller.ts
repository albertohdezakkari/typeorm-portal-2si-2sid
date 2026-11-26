import { Controller, Get, Param } from '@nestjs/common';
import { ListarPorDocumentoService } from './service';

@Controller('documentos/:documentoId/asignaciones')
export class ListarPorDocumentoController {
  constructor(private readonly service: ListarPorDocumentoService) {}

  @Get()
  listar(@Param('documentoId') documentoId: string) {
    return this.service.listarAsignacionesPorDocumentoService(Number(documentoId));
  }
}
