import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('agricultores')
  crearAgricultor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearAgricultor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('agricultores')
  listarAgricultores() {
    return this.service.listarAgricultores();
  }

  @Post('cosechas/:cosechaId/asignaciones')
  asignar(@Param('cosechaId') cosechaId: string, @Body() datos: { agricultorId: number; rol: string }) {
    return this.service.asignarAgricultor(Number(cosechaId), datos.agricultorId, datos.rol);
  }

  @Get('cosechas/:cosechaId/asignaciones')
  listarPorCosecha(@Param('cosechaId') cosechaId: string) {
    return this.service.listarPorCosecha(Number(cosechaId));
  }

  @Get('agricultores/:agricultorId/asignaciones')
  listarPorAgricultor(@Param('agricultorId') agricultorId: string) {
    return this.service.listarPorAgricultor(Number(agricultorId));
  }

  @Patch('cosechas/:cosechaId/asignaciones/:agricultorId')
  modificarRol(@Param('cosechaId') cosechaId: string, @Param('agricultorId') agricultorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(cosechaId), Number(agricultorId), datos.rol);
  }

  @Delete('cosechas/:cosechaId/asignaciones/:agricultorId')
  @HttpCode(204)
  eliminar(@Param('cosechaId') cosechaId: string, @Param('agricultorId') agricultorId: string) {
    return this.service.eliminarAsignacion(Number(cosechaId), Number(agricultorId));
  }
}
