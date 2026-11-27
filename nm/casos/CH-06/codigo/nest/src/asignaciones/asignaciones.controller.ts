import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('instructores')
  crearInstructor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInstructor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('instructores')
  listarInstructores() {
    return this.service.listarInstructores();
  }

  @Post('sesiones/:sesionId/asignaciones')
  asignar(@Param('sesionId') sesionId: string, @Body() datos: { instructorId: number; rol: string }) {
    return this.service.asignarInstructor(Number(sesionId), datos.instructorId, datos.rol);
  }

  @Get('sesiones/:sesionId/asignaciones')
  listarPorSesion(@Param('sesionId') sesionId: string) {
    return this.service.listarPorSesion(Number(sesionId));
  }

  @Get('instructores/:instructorId/asignaciones')
  listarPorInstructor(@Param('instructorId') instructorId: string) {
    return this.service.listarPorInstructor(Number(instructorId));
  }

  @Patch('sesiones/:sesionId/asignaciones/:instructorId')
  modificarRol(@Param('sesionId') sesionId: string, @Param('instructorId') instructorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(sesionId), Number(instructorId), datos.rol);
  }

  @Delete('sesiones/:sesionId/asignaciones/:instructorId')
  @HttpCode(204)
  eliminar(@Param('sesionId') sesionId: string, @Param('instructorId') instructorId: string) {
    return this.service.eliminarAsignacion(Number(sesionId), Number(instructorId));
  }
}
