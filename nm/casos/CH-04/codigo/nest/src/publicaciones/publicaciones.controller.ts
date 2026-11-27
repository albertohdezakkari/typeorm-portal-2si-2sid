import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';

@Controller()
export class PublicacionesController {
  constructor(private readonly service: PublicacionesService) {}

  @Post('publicaciones')
  crear(@Body() datos: { nombre: string; paginas: number; editorialId: number }) {
    return this.service.crearPublicacion(datos.nombre, datos.paginas, datos.editorialId);
  }

  @Get('publicaciones')
  listar() {
    return this.service.listarPublicaciones();
  }

  @Delete('publicaciones/:publicacionId')
  @HttpCode(204)
  eliminar(@Param('publicacionId') publicacionId: string) {
    return this.service.eliminarPublicacion(Number(publicacionId));
  }

  @Patch('publicaciones/:publicacionId')
  modificar(@Param('publicacionId') publicacionId: string, @Body() datos: { paginas: number }) {
    return this.service.modificarPaginas(Number(publicacionId), datos.paginas);
  }

  @Patch('publicaciones/:publicacionId/editorial')
  cambiarEditorial(@Param('publicacionId') publicacionId: string, @Body() datos: { editorialId: number }) {
    return this.service.cambiarEditorial(Number(publicacionId), datos.editorialId);
  }

  @Get('editoriales/:editorialId/publicaciones')
  consultar(@Param('editorialId') editorialId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarEditorial(Number(editorialId), Number(minimo));
  }
}
