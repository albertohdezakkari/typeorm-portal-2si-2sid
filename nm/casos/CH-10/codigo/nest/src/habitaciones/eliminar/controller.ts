import { Controller, Delete, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { EliminarService } from './service';

@Controller()
export class EliminarController {
  constructor(private readonly service: EliminarService) {}

  @Delete('habitaciones/:habitacionId')
  @HttpCode(204)
  async ejecutar(@Param('habitacionId', ParseIntPipe) habitacionId: number) {
    return this.service.eliminarHabitacionService(habitacionId);
  }
}
