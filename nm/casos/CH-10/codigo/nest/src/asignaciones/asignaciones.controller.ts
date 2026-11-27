import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('habitaciones/:habitacionId/asignaciones')
  asignar(@Param('habitacionId') habitacionId: string, @Body() datos: { enfermeroId: number; rol: string }) {
    return this.service.asignarEnfermero(Number(habitacionId), datos.enfermeroId, datos.rol);
  }

  @Get('habitaciones/:habitacionId/asignaciones')
  listarPorHabitacion(@Param('habitacionId') habitacionId: string) {
    return this.service.listarPorHabitacion(Number(habitacionId));
  }

  @Get('enfermeros/:enfermeroId/asignaciones')
  listarPorEnfermero(@Param('enfermeroId') enfermeroId: string) {
    return this.service.listarPorEnfermero(Number(enfermeroId));
  }

  @Patch('habitaciones/:habitacionId/asignaciones/:enfermeroId')
  modificarRol(@Param('habitacionId') habitacionId: string, @Param('enfermeroId') enfermeroId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(habitacionId), Number(enfermeroId), datos.rol);
  }

  @Delete('habitaciones/:habitacionId/asignaciones/:enfermeroId')
  @HttpCode(204)
  eliminar(@Param('habitacionId') habitacionId: string, @Param('enfermeroId') enfermeroId: string) {
    return this.service.eliminarAsignacion(Number(habitacionId), Number(enfermeroId));
  }
}
