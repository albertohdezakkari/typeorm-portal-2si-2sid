import { Body, Controller, Get, Post, Delete, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { DocumentosService } from './documentos.service';

@Controller()
export class DocumentosController {
  constructor(private readonly service: DocumentosService) {}

  @Post('documentos')
  crear(@Body() datos: { nombre: string; paginas: number; archivoId: number }) {
    return this.service.crearDocumento(datos.nombre, datos.paginas, datos.archivoId);
  }

  @Get('documentos')
  listar() {
    return this.service.listarDocumentos();
  }

  @Delete('documentos/:documentoId')
  @HttpCode(204)
  eliminar(@Param('documentoId') documentoId: string) {
    return this.service.eliminarDocumento(Number(documentoId));
  }

  @Patch('documentos/:documentoId')
  modificar(@Param('documentoId') documentoId: string, @Body() datos: { paginas: number }) {
    return this.service.modificarPaginas(Number(documentoId), datos.paginas);
  }

  @Patch('documentos/:documentoId/archivo')
  cambiarArchivo(@Param('documentoId') documentoId: string, @Body() datos: { archivoId: number }) {
    return this.service.cambiarArchivo(Number(documentoId), datos.archivoId);
  }

  @Get('archivos/:archivoId/documentos')
  consultar(@Param('archivoId') archivoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarArchivo(Number(archivoId), Number(minimo));
  }
}
