import { Controller, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ModificarPaginasService } from './service';

@Controller()
export class ModificarPaginasController {
  constructor(private readonly service: ModificarPaginasService) {}

  @Patch('publicaciones/:publicacionId')
  async ejecutar(@Param('publicacionId', ParseIntPipe) publicacionId: number,
    @Body() datos: { paginas: number }) {
    return this.service.modificarPaginasService(publicacionId, datos.paginas);
  }
}
