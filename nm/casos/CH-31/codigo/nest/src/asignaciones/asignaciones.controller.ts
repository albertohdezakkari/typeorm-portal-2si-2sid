import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('revisores')
  crearRevisor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearRevisor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('revisores')
  listarRevisores() {
    return this.service.listarRevisores();
  }

  @Post('documentos/:documentoId/asignaciones')
  asignar(@Param('documentoId') documentoId: string, @Body() datos: { revisorId: number; rol: string }) {
    return this.service.asignarRevisor(Number(documentoId), datos.revisorId, datos.rol);
  }

  @Get('documentos/:documentoId/asignaciones')
  listarPorDocumento(@Param('documentoId') documentoId: string) {
    return this.service.listarPorDocumento(Number(documentoId));
  }

  @Get('revisores/:revisorId/asignaciones')
  listarPorRevisor(@Param('revisorId') revisorId: string) {
    return this.service.listarPorRevisor(Number(revisorId));
  }

  @Patch('documentos/:documentoId/asignaciones/:revisorId')
  modificarRol(@Param('documentoId') documentoId: string, @Param('revisorId') revisorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(documentoId), Number(revisorId), datos.rol);
  }

  @Delete('documentos/:documentoId/asignaciones/:revisorId')
  @HttpCode(204)
  eliminar(@Param('documentoId') documentoId: string, @Param('revisorId') revisorId: string) {
    return this.service.eliminarAsignacion(Number(documentoId), Number(revisorId));
  }
}
