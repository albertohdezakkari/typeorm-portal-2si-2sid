import { Artista } from './artistas/entities/artista.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ArtistasRepository } from './artistas/crear-listar/repository';
import { ArtistasService } from './artistas/crear-listar/service';
import { ArtistasController } from './artistas/crear-listar/controller';
import { AsignarArtistaRepository } from './asignaciones/asignar-artista/repository';
import { AsignarArtistaService } from './asignaciones/asignar-artista/service';
import { AsignarArtistaController } from './asignaciones/asignar-artista/controller';
import { ListarPorActuacionRepository } from './asignaciones/listar-por-actuacion/repository';
import { ListarPorActuacionService } from './asignaciones/listar-por-actuacion/service';
import { ListarPorActuacionController } from './asignaciones/listar-por-actuacion/controller';
import { ListarPorArtistaRepository } from './asignaciones/listar-por-artista/repository';
import { ListarPorArtistaService } from './asignaciones/listar-por-artista/service';
import { ListarPorArtistaController } from './asignaciones/listar-por-artista/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Festival } from './festivales/entities/festival.entity';
import { Actuacion } from './actuaciones/entities/actuacion.entity';
import { CrearListarController } from './actuaciones/crear-listar/controller';
import { CrearListarService } from './actuaciones/crear-listar/service';
import { CrearListarRepository } from './actuaciones/crear-listar/repository';
import { EliminarController } from './actuaciones/eliminar/controller';
import { EliminarService } from './actuaciones/eliminar/service';
import { EliminarRepository } from './actuaciones/eliminar/repository';
import { ModificarDuracionMinutosController } from './actuaciones/modificar-duracion-minutos/controller';
import { ModificarDuracionMinutosService } from './actuaciones/modificar-duracion-minutos/service';
import { ModificarDuracionMinutosRepository } from './actuaciones/modificar-duracion-minutos/repository';
import { TrasladarController } from './actuaciones/trasladar/controller';
import { TrasladarService } from './actuaciones/trasladar/service';
import { TrasladarRepository } from './actuaciones/trasladar/repository';
import { ConsultarFestivalController } from './festivales/consultar/controller';
import { ConsultarFestivalService } from './festivales/consultar/service';
import { ConsultarFestivalRepository } from './festivales/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Festival, Actuacion, Artista, Asignacion])],
  controllers: [ArtistasController, AsignarArtistaController, ListarPorActuacionController, ListarPorArtistaController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDuracionMinutosController, TrasladarController, ConsultarFestivalController],
  providers: [ArtistasRepository, ArtistasService, AsignarArtistaRepository, AsignarArtistaService, ListarPorActuacionRepository, ListarPorActuacionService, ListarPorArtistaRepository, ListarPorArtistaService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDuracionMinutosService, TrasladarService, ConsultarFestivalService, CrearListarRepository, EliminarRepository, ModificarDuracionMinutosRepository, TrasladarRepository, ConsultarFestivalRepository]
})
export class TallerModule {}
