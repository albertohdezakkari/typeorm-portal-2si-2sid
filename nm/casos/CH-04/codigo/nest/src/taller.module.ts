import { Autor } from './autores/entities/autor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { AutoresRepository } from './autores/crear-listar/repository';
import { AutoresService } from './autores/crear-listar/service';
import { AutoresController } from './autores/crear-listar/controller';
import { AsignarAutorRepository } from './asignaciones/asignar-autor/repository';
import { AsignarAutorService } from './asignaciones/asignar-autor/service';
import { AsignarAutorController } from './asignaciones/asignar-autor/controller';
import { ListarPorPublicacionRepository } from './asignaciones/listar-por-publicacion/repository';
import { ListarPorPublicacionService } from './asignaciones/listar-por-publicacion/service';
import { ListarPorPublicacionController } from './asignaciones/listar-por-publicacion/controller';
import { ListarPorAutorRepository } from './asignaciones/listar-por-autor/repository';
import { ListarPorAutorService } from './asignaciones/listar-por-autor/service';
import { ListarPorAutorController } from './asignaciones/listar-por-autor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './editoriales/entities/editorial.entity';
import { Publicacion } from './publicaciones/entities/publicacion.entity';
import { CrearListarController } from './publicaciones/crear-listar/controller';
import { CrearListarService } from './publicaciones/crear-listar/service';
import { CrearListarRepository } from './publicaciones/crear-listar/repository';
import { EliminarController } from './publicaciones/eliminar/controller';
import { EliminarService } from './publicaciones/eliminar/service';
import { EliminarRepository } from './publicaciones/eliminar/repository';
import { ModificarPaginasController } from './publicaciones/modificar-paginas/controller';
import { ModificarPaginasService } from './publicaciones/modificar-paginas/service';
import { ModificarPaginasRepository } from './publicaciones/modificar-paginas/repository';
import { TrasladarController } from './publicaciones/trasladar/controller';
import { TrasladarService } from './publicaciones/trasladar/service';
import { TrasladarRepository } from './publicaciones/trasladar/repository';
import { ConsultarEditorialController } from './editoriales/consultar/controller';
import { ConsultarEditorialService } from './editoriales/consultar/service';
import { ConsultarEditorialRepository } from './editoriales/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial, Publicacion, Autor, Asignacion])],
  controllers: [AutoresController, AsignarAutorController, ListarPorPublicacionController, ListarPorAutorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPaginasController, TrasladarController, ConsultarEditorialController],
  providers: [AutoresRepository, AutoresService, AsignarAutorRepository, AsignarAutorService, ListarPorPublicacionRepository, ListarPorPublicacionService, ListarPorAutorRepository, ListarPorAutorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPaginasService, TrasladarService, ConsultarEditorialService, CrearListarRepository, EliminarRepository, ModificarPaginasRepository, TrasladarRepository, ConsultarEditorialRepository]
})
export class TallerModule {}
