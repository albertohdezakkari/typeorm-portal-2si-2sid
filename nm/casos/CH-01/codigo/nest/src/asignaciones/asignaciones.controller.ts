import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('cuidadores')
  crearCuidador(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearCuidador(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('cuidadores')
  listarCuidadores() {
    return this.service.listarCuidadores();
  }

  @Post('animales/:animalId/asignaciones')
  asignar(@Param('animalId') animalId: string, @Body() datos: { cuidadorId: number; rol: string }) {
    return this.service.asignarCuidador(Number(animalId), datos.cuidadorId, datos.rol);
  }

  @Get('animales/:animalId/asignaciones')
  listarPorAnimal(@Param('animalId') animalId: string) {
    return this.service.listarPorAnimal(Number(animalId));
  }

  @Get('cuidadores/:cuidadorId/asignaciones')
  listarPorCuidador(@Param('cuidadorId') cuidadorId: string) {
    return this.service.listarPorCuidador(Number(cuidadorId));
  }

  @Patch('animales/:animalId/asignaciones/:cuidadorId')
  modificarRol(@Param('animalId') animalId: string, @Param('cuidadorId') cuidadorId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(animalId), Number(cuidadorId), datos.rol);
  }

  @Delete('animales/:animalId/asignaciones/:cuidadorId')
  @HttpCode(204)
  eliminar(@Param('animalId') animalId: string, @Param('cuidadorId') cuidadorId: string) {
    return this.service.eliminarAsignacion(Number(animalId), Number(cuidadorId));
  }
}
