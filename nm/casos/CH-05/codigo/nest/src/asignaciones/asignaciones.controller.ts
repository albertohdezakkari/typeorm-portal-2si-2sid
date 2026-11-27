import { Body, Controller, Param, Post, Get, Patch, Delete, HttpCode } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

  @Post('artistas')
  crearArtista(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearArtista(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('artistas')
  listarArtistas() {
    return this.service.listarArtistas();
  }

  @Post('actuaciones/:actuacionId/asignaciones')
  asignar(@Param('actuacionId') actuacionId: string, @Body() datos: { artistaId: number; rol: string }) {
    return this.service.asignarArtista(Number(actuacionId), datos.artistaId, datos.rol);
  }

  @Get('actuaciones/:actuacionId/asignaciones')
  listarPorActuacion(@Param('actuacionId') actuacionId: string) {
    return this.service.listarPorActuacion(Number(actuacionId));
  }

  @Get('artistas/:artistaId/asignaciones')
  listarPorArtista(@Param('artistaId') artistaId: string) {
    return this.service.listarPorArtista(Number(artistaId));
  }

  @Patch('actuaciones/:actuacionId/asignaciones/:artistaId')
  modificarRol(@Param('actuacionId') actuacionId: string, @Param('artistaId') artistaId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(actuacionId), Number(artistaId), datos.rol);
  }

  @Delete('actuaciones/:actuacionId/asignaciones/:artistaId')
  @HttpCode(204)
  eliminar(@Param('actuacionId') actuacionId: string, @Param('artistaId') artistaId: string) {
    return this.service.eliminarAsignacion(Number(actuacionId), Number(artistaId));
  }
}
