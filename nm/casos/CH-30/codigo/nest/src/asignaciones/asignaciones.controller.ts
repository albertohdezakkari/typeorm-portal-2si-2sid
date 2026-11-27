import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('interpretes')
  crearInterprete(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInterprete(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('interpretes')
  listarInterpretes() {
    return this.service.listarInterpretes();
  }

  @Post('funciones/:funcionId/asignaciones')
  asignar(@Param('funcionId') funcionId: string, @Body() datos: { interpreteId: number; rol: string }) {
    return this.service.asignarInterprete(Number(funcionId), datos.interpreteId, datos.rol);
  }

  @Get('funciones/:funcionId/asignaciones')
  listarPorFuncion(@Param('funcionId') funcionId: string) {
    return this.service.listarPorFuncion(Number(funcionId));
  }

  @Get('interpretes/:interpreteId/asignaciones')
  listarPorInterprete(@Param('interpreteId') interpreteId: string) {
    return this.service.listarPorInterprete(Number(interpreteId));
  }

  @Patch('funciones/:funcionId/asignaciones/:interpreteId')
  modificarRol(@Param('funcionId') funcionId: string, @Param('interpreteId') interpreteId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(funcionId), Number(interpreteId), datos.rol);
  }

  @Delete('funciones/:funcionId/asignaciones/:interpreteId')
  @HttpCode(204)
  eliminar(@Param('funcionId') funcionId: string, @Param('interpreteId') interpreteId: string) {
    return this.service.eliminarAsignacion(Number(funcionId), Number(interpreteId));
  }
}
