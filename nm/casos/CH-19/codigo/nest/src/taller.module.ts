import { Tripulante } from './tripulantes/entities/tripulante.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TripulantesRepository } from './tripulantes/crear-listar/repository';
import { TripulantesService } from './tripulantes/crear-listar/service';
import { TripulantesController } from './tripulantes/crear-listar/controller';
import { AsignarTripulanteRepository } from './asignaciones/asignar-tripulante/repository';
import { AsignarTripulanteService } from './asignaciones/asignar-tripulante/service';
import { AsignarTripulanteController } from './asignaciones/asignar-tripulante/controller';
import { ListarPorEmbarcacionRepository } from './asignaciones/listar-por-embarcacion/repository';
import { ListarPorEmbarcacionService } from './asignaciones/listar-por-embarcacion/service';
import { ListarPorEmbarcacionController } from './asignaciones/listar-por-embarcacion/controller';
import { ListarPorTripulanteRepository } from './asignaciones/listar-por-tripulante/repository';
import { ListarPorTripulanteService } from './asignaciones/listar-por-tripulante/service';
import { ListarPorTripulanteController } from './asignaciones/listar-por-tripulante/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puerto } from './puertos/entities/puerto.entity';
import { Embarcacion } from './embarcaciones/entities/embarcacion.entity';
import { CrearListarController } from './embarcaciones/crear-listar/controller';
import { CrearListarService } from './embarcaciones/crear-listar/service';
import { CrearListarRepository } from './embarcaciones/crear-listar/repository';
import { EliminarController } from './embarcaciones/eliminar/controller';
import { EliminarService } from './embarcaciones/eliminar/service';
import { EliminarRepository } from './embarcaciones/eliminar/repository';
import { ModificarEsloraMetrosController } from './embarcaciones/modificar-eslora-metros/controller';
import { ModificarEsloraMetrosService } from './embarcaciones/modificar-eslora-metros/service';
import { ModificarEsloraMetrosRepository } from './embarcaciones/modificar-eslora-metros/repository';
import { TrasladarController } from './embarcaciones/trasladar/controller';
import { TrasladarService } from './embarcaciones/trasladar/service';
import { TrasladarRepository } from './embarcaciones/trasladar/repository';
import { ConsultarPuertoController } from './puertos/consultar/controller';
import { ConsultarPuertoService } from './puertos/consultar/service';
import { ConsultarPuertoRepository } from './puertos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Puerto, Embarcacion, Tripulante, Asignacion])],
  controllers: [TripulantesController, AsignarTripulanteController, ListarPorEmbarcacionController, ListarPorTripulanteController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarEsloraMetrosController, TrasladarController, ConsultarPuertoController],
  providers: [TripulantesRepository, TripulantesService, AsignarTripulanteRepository, AsignarTripulanteService, ListarPorEmbarcacionRepository, ListarPorEmbarcacionService, ListarPorTripulanteRepository, ListarPorTripulanteService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarEsloraMetrosService, TrasladarService, ConsultarPuertoService, CrearListarRepository, EliminarRepository, ModificarEsloraMetrosRepository, TrasladarRepository, ConsultarPuertoRepository]
})
export class TallerModule {}
