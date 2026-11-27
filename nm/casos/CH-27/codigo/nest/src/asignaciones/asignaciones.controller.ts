import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('plazas/:plazaId/asignaciones')
  asignar(@Param('plazaId') plazaId: string, @Body() datos: { tecnicoId: number; rol: string }) {
    return this.service.asignarTecnico(Number(plazaId), datos.tecnicoId, datos.rol);
  }

  @Get('plazas/:plazaId/asignaciones')
  listarPorPlaza(@Param('plazaId') plazaId: string) {
    return this.service.listarPorPlaza(Number(plazaId));
  }

  @Get('tecnicos/:tecnicoId/asignaciones')
  listarPorTecnico(@Param('tecnicoId') tecnicoId: string) {
    return this.service.listarPorTecnico(Number(tecnicoId));
  }

  @Patch('plazas/:plazaId/asignaciones/:tecnicoId')
  modificarRol(@Param('plazaId') plazaId: string, @Param('tecnicoId') tecnicoId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(plazaId), Number(tecnicoId), datos.rol);
  }

  @Delete('plazas/:plazaId/asignaciones/:tecnicoId')
  @HttpCode(204)
  eliminar(@Param('plazaId') plazaId: string, @Param('tecnicoId') tecnicoId: string) {
    return this.service.eliminarAsignacion(Number(plazaId), Number(tecnicoId));
  }
}
