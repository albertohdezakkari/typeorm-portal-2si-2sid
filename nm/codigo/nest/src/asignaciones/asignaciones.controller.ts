import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('profesionales')
  crearProfesional(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearProfesional(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('profesionales')
  listarProfesionales() {
    return this.service.listarProfesionales();
  }

  @Post('obras/:obraId/asignaciones')
  asignar(@Param('obraId') obraId: string, @Body() datos: { profesionalId: number; rol: string }) {
    return this.service.asignarProfesional(Number(obraId), datos.profesionalId, datos.rol);
  }

  @Get('obras/:obraId/asignaciones')
  listarPorObra(@Param('obraId') obraId: string) {
    return this.service.listarPorObra(Number(obraId));
  }

  @Get('profesionales/:profesionalId/asignaciones')
  listarPorProfesional(@Param('profesionalId') profesionalId: string) {
    return this.service.listarPorProfesional(Number(profesionalId));
  }

  @Patch('obras/:obraId/asignaciones/:profesionalId')
  modificarRol(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(obraId), Number(profesionalId), datos.rol);
  }

  @Delete('obras/:obraId/asignaciones/:profesionalId')
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string) {
    return this.service.eliminarAsignacion(Number(obraId), Number(profesionalId));
  }
}
