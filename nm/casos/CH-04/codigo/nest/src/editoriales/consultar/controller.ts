import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ConsultarEditorialService } from './service';

@Controller()
export class ConsultarEditorialController {
  constructor(private readonly service: ConsultarEditorialService) {}

  @Get('editoriales/:editorialId/publicaciones')
  async ejecutar(@Param('editorialId', ParseIntPipe) editorialId: number,
    @Query('minimo', new DefaultValuePipe(0), ParseIntPipe) minimo: number) {
    return this.service.consultarEditorialService(editorialId, minimo);
  }
}
