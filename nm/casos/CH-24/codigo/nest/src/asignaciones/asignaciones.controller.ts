import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('pistas/:pistaId/asignaciones')
  asignar(@Param('pistaId') pistaId: string, @Body() datos: { entrenadorId: number; rol: string }) {
    return this.service.asignarEntrenador(Number(pistaId), datos.entrenadorId, datos.rol);
  }

  @Get('pistas/:pistaId/asignaciones')
  listarPorPista(@Param('pistaId') pistaId: string) {
    return this.service.listarPorPista(Number(pistaId));
  }

  @Get('entrenadores/:entrenadorId/asignaciones')
  listarPorEntrenador(@Param('entrenadorId') entrenadorId: string) {
    return this.service.listarPorEntrenador(Number(entrenadorId));
  }

  @Patch('pistas/:pistaId/asignaciones/:entrenadorId')
  modificarRol(@Param('pistaId') pistaId: string, @Param('entrenadorId') entrenadorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(pistaId), Number(entrenadorId), datos.rol);
  }

  @Delete('pistas/:pistaId/asignaciones/:entrenadorId')
  @HttpCode(204)
  eliminar(@Param('pistaId') pistaId: string, @Param('entrenadorId') entrenadorId: string) {
    return this.service.eliminarAsignacion(Number(pistaId), Number(entrenadorId));
  }
}
