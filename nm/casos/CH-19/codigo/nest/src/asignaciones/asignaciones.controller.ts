import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('tripulantes')
  crearTripulante(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearTripulante(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('tripulantes')
  listarTripulantes() {
    return this.service.listarTripulantes();
  }

  @Post('embarcaciones/:embarcacionId/asignaciones')
  asignar(@Param('embarcacionId') embarcacionId: string, @Body() datos: { tripulanteId: number; rol: string }) {
    return this.service.asignarTripulante(Number(embarcacionId), datos.tripulanteId, datos.rol);
  }

  @Get('embarcaciones/:embarcacionId/asignaciones')
  listarPorEmbarcacion(@Param('embarcacionId') embarcacionId: string) {
    return this.service.listarPorEmbarcacion(Number(embarcacionId));
  }

  @Get('tripulantes/:tripulanteId/asignaciones')
  listarPorTripulante(@Param('tripulanteId') tripulanteId: string) {
    return this.service.listarPorTripulante(Number(tripulanteId));
  }

  @Patch('embarcaciones/:embarcacionId/asignaciones/:tripulanteId')
  modificarRol(@Param('embarcacionId') embarcacionId: string, @Param('tripulanteId') tripulanteId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(embarcacionId), Number(tripulanteId), datos.rol);
  }

  @Delete('embarcaciones/:embarcacionId/asignaciones/:tripulanteId')
  @HttpCode(204)
  eliminar(@Param('embarcacionId') embarcacionId: string, @Param('tripulanteId') tripulanteId: string) {
    return this.service.eliminarAsignacion(Number(embarcacionId), Number(tripulanteId));
  }
}
