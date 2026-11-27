import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ProgramasService } from './programas.service';

@Controller()
export class ProgramasController {
  constructor(private readonly service: ProgramasService) {}

  @Post('programas')
  crear(@Body() datos: { nombre: string; duracionMinutos: number; emisoraId: number }) {
    return this.service.crearPrograma(datos.nombre, datos.duracionMinutos, datos.emisoraId);
  }

  @Get('programas')
  listar() {
    return this.service.listarProgramas();
  }

  @Delete('programas/:programaId')
  @HttpCode(204)
  eliminar(@Param('programaId') programaId: string) {
    return this.service.eliminarPrograma(Number(programaId));
  }

  @Patch('programas/:programaId')
  modificar(@Param('programaId') programaId: string, @Body() datos: { duracionMinutos: number }) {
    return this.service.modificarDuracionMinutos(Number(programaId), datos.duracionMinutos);
  }

  @Patch('programas/:programaId/emisora')
  cambiarEmisora(@Param('programaId') programaId: string, @Body() datos: { emisoraId: number }) {
    return this.service.cambiarEmisora(Number(programaId), datos.emisoraId);
  }

  @Get('emisoras/:emisoraId/programas')
  consultar(@Param('emisoraId') emisoraId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEmisora(Number(emisoraId), Number(minimo));
  }
}
