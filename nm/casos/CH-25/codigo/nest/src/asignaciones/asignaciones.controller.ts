import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('programas/:programaId/asignaciones')
  asignar(@Param('programaId') programaId: string, @Body() datos: { locutorId: number; rol: string }) {
    return this.service.asignarLocutor(Number(programaId), datos.locutorId, datos.rol);
  }

  @Get('programas/:programaId/asignaciones')
  listarPorPrograma(@Param('programaId') programaId: string) {
    return this.service.listarPorPrograma(Number(programaId));
  }

  @Get('locutores/:locutorId/asignaciones')
  listarPorLocutor(@Param('locutorId') locutorId: string) {
    return this.service.listarPorLocutor(Number(locutorId));
  }

  @Patch('programas/:programaId/asignaciones/:locutorId')
  modificarRol(@Param('programaId') programaId: string, @Param('locutorId') locutorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(programaId), Number(locutorId), datos.rol);
  }

  @Delete('programas/:programaId/asignaciones/:locutorId')
  @HttpCode(204)
  eliminar(@Param('programaId') programaId: string, @Param('locutorId') locutorId: string) {
    return this.service.eliminarAsignacion(Number(programaId), Number(locutorId));
  }
}
