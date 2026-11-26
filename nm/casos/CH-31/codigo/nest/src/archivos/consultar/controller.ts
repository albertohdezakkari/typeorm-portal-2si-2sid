import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarArchivoService } from './service';

@Controller()
export class ConsultarArchivoController {
  constructor(private readonly service: ConsultarArchivoService) {}

  @Get('archivos/:archivoId/documentos')
  async ejecutar(@Param('archivoId', ParseIntPipe) archivoId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarArchivoService(archivoId, minimo);
  }
}
