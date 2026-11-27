import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';

@Controller()
export class ProyectosController {
  constructor(private readonly service: ProyectosService) {}

  @Post('proyectos')
  crear(@Body() datos: { nombre: string; horasEstimadas: number; empresaId: number }) {
    return this.service.crearProyecto(datos.nombre, datos.horasEstimadas, datos.empresaId);
  }

  @Get('proyectos')
  listar() {
    return this.service.listarProyectos();
  }

  @Delete('proyectos/:proyectoId')
  @HttpCode(204)
  eliminar(@Param('proyectoId') proyectoId: string) {
    return this.service.eliminarProyecto(Number(proyectoId));
  }

  @Patch('proyectos/:proyectoId')
  modificar(@Param('proyectoId') proyectoId: string, @Body() datos: { horasEstimadas: number }) {
    return this.service.modificarHorasEstimadas(Number(proyectoId), datos.horasEstimadas);
  }

  @Patch('proyectos/:proyectoId/empresa')
  cambiarEmpresa(@Param('proyectoId') proyectoId: string, @Body() datos: { empresaId: number }) {
    return this.service.cambiarEmpresa(Number(proyectoId), datos.empresaId);
  }

  @Get('empresas/:empresaId/proyectos')
  consultar(@Param('empresaId') empresaId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEmpresa(Number(empresaId), Number(minimo));
  }
}
