import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEmpresaService } from './service';

@Controller()
export class ConsultarEmpresaController {
  constructor(private readonly service: ConsultarEmpresaService) {}

  @Get('empresas/:empresaId/proyectos')
  async ejecutar(@Param('empresaId', ParseIntPipe) empresaId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEmpresaService(empresaId, minimo);
  }
}
