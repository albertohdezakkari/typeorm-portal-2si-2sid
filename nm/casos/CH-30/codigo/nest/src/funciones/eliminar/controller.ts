import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('funciones/:funcionId')
  @HttpCode(204)
  async ejecutar(@Param('funcionId', ParseIntPipe) funcionId: number) {
    return this.service.eliminarFuncionService(funcionId);
  }
}
