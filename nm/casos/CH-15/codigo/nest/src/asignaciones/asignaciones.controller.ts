import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('colaboradores')
  crearColaborador(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearColaborador(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('colaboradores')
  listarColaboradores() {
    return this.service.listarColaboradores();
  }

  @Post('proyectos/:proyectoId/asignaciones')
  asignar(@Param('proyectoId') proyectoId: string, @Body() datos: { colaboradorId: number; rol: string }) {
    return this.service.asignarColaborador(Number(proyectoId), datos.colaboradorId, datos.rol);
  }

  @Get('proyectos/:proyectoId/asignaciones')
  listarPorProyecto(@Param('proyectoId') proyectoId: string) {
    return this.service.listarPorProyecto(Number(proyectoId));
  }

  @Get('colaboradores/:colaboradorId/asignaciones')
  listarPorColaborador(@Param('colaboradorId') colaboradorId: string) {
    return this.service.listarPorColaborador(Number(colaboradorId));
  }

  @Patch('proyectos/:proyectoId/asignaciones/:colaboradorId')
  modificarRol(@Param('proyectoId') proyectoId: string, @Param('colaboradorId') colaboradorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(proyectoId), Number(colaboradorId), datos.rol);
  }

  @Delete('proyectos/:proyectoId/asignaciones/:colaboradorId')
  @HttpCode(204)
  eliminar(@Param('proyectoId') proyectoId: string, @Param('colaboradorId') colaboradorId: string) {
    return this.service.eliminarAsignacion(Number(proyectoId), Number(colaboradorId));
  }
}
