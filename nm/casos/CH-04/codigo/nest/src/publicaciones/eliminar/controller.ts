import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('publicaciones/:publicacionId')
  @HttpCode(204)
  async ejecutar(@Param('publicacionId', ParseIntPipe) publicacionId: number) {
    return this.service.eliminarPublicacionService(publicacionId);
  }
}
