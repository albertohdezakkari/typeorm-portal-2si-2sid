import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('proyecciones/:proyeccionId/asignaciones')
  asignar(@Param('proyeccionId') proyeccionId: string, @Body() datos: { tecnicoId: number; rol: string }) {
    return this.service.asignarTecnico(Number(proyeccionId), datos.tecnicoId, datos.rol);
  }

  @Get('proyecciones/:proyeccionId/asignaciones')
  listarPorProyeccion(@Param('proyeccionId') proyeccionId: string) {
    return this.service.listarPorProyeccion(Number(proyeccionId));
  }

  @Get('tecnicos/:tecnicoId/asignaciones')
  listarPorTecnico(@Param('tecnicoId') tecnicoId: string) {
    return this.service.listarPorTecnico(Number(tecnicoId));
  }

  @Patch('proyecciones/:proyeccionId/asignaciones/:tecnicoId')
  modificarRol(@Param('proyeccionId') proyeccionId: string, @Param('tecnicoId') tecnicoId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(proyeccionId), Number(tecnicoId), datos.rol);
  }

  @Delete('proyecciones/:proyeccionId/asignaciones/:tecnicoId')
  @HttpCode(204)
  eliminar(@Param('proyeccionId') proyeccionId: string, @Param('tecnicoId') tecnicoId: string) {
    return this.service.eliminarAsignacion(Number(proyeccionId), Number(tecnicoId));
  }
}
