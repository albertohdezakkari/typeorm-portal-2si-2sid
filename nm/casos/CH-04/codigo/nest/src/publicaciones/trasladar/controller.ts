import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { TrasladarService } from './service';

@Controller()
export class TrasladarController {
  constructor(private readonly service: TrasladarService) {}

  @Patch('publicaciones/:publicacionId/editorial')
  async ejecutar(@Param('publicacionId', ParseIntPipe) publicacionId: number,
    @Body() datos: { editorialId: number }) {
    return this.service.trasladarPublicacionService(publicacionId, datos.editorialId);
  }
}
