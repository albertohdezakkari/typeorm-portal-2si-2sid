import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('restauradores')
  crearRestaurador(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearRestaurador(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('restauradores')
  listarRestauradores() {
    return this.service.listarRestauradores();
  }

  @Post('piezas/:piezaId/asignaciones')
  asignar(@Param('piezaId') piezaId: string, @Body() datos: { restauradorId: number; rol: string }) {
    return this.service.asignarRestaurador(Number(piezaId), datos.restauradorId, datos.rol);
  }

  @Get('piezas/:piezaId/asignaciones')
  listarPorPieza(@Param('piezaId') piezaId: string) {
    return this.service.listarPorPieza(Number(piezaId));
  }

  @Get('restauradores/:restauradorId/asignaciones')
  listarPorRestaurador(@Param('restauradorId') restauradorId: string) {
    return this.service.listarPorRestaurador(Number(restauradorId));
  }

  @Patch('piezas/:piezaId/asignaciones/:restauradorId')
  modificarRol(@Param('piezaId') piezaId: string, @Param('restauradorId') restauradorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(piezaId), Number(restauradorId), datos.rol);
  }

  @Delete('piezas/:piezaId/asignaciones/:restauradorId')
  @HttpCode(204)
  eliminar(@Param('piezaId') piezaId: string, @Param('restauradorId') restauradorId: string) {
    return this.service.eliminarAsignacion(Number(piezaId), Number(restauradorId));
  }
}
