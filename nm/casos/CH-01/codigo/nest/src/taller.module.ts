import { Cuidador } from './cuidadores/entities/cuidador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CuidadoresRepository } from './cuidadores/crear-listar/repository';
import { CuidadoresService } from './cuidadores/crear-listar/service';
import { CuidadoresController } from './cuidadores/crear-listar/controller';
import { AsignarCuidadorRepository } from './asignaciones/asignar-cuidador/repository';
import { AsignarCuidadorService } from './asignaciones/asignar-cuidador/service';
import { AsignarCuidadorController } from './asignaciones/asignar-cuidador/controller';
import { ListarPorAnimalRepository } from './asignaciones/listar-por-animal/repository';
import { ListarPorAnimalService } from './asignaciones/listar-por-animal/service';
import { ListarPorAnimalController } from './asignaciones/listar-por-animal/controller';
import { ListarPorCuidadorRepository } from './asignaciones/listar-por-cuidador/repository';
import { ListarPorCuidadorService } from './asignaciones/listar-por-cuidador/service';
import { ListarPorCuidadorController } from './asignaciones/listar-por-cuidador/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refugio } from './refugios/entities/refugio.entity';
import { Animal } from './animales/entities/animal.entity';
import { CrearListarController } from './animales/crear-listar/controller';
import { CrearListarService } from './animales/crear-listar/service';
import { CrearListarRepository } from './animales/crear-listar/repository';
import { EliminarController } from './animales/eliminar/controller';
import { EliminarService } from './animales/eliminar/service';
import { EliminarRepository } from './animales/eliminar/repository';
import { ModificarEdadMesesController } from './animales/modificar-edad-meses/controller';
import { ModificarEdadMesesService } from './animales/modificar-edad-meses/service';
import { ModificarEdadMesesRepository } from './animales/modificar-edad-meses/repository';
import { TrasladarController } from './animales/trasladar/controller';
import { TrasladarService } from './animales/trasladar/service';
import { TrasladarRepository } from './animales/trasladar/repository';
import { ConsultarRefugioController } from './refugios/consultar/controller';
import { ConsultarRefugioService } from './refugios/consultar/service';
import { ConsultarRefugioRepository } from './refugios/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Refugio, Animal, Cuidador, Asignacion])],
  controllers: [CuidadoresController, AsignarCuidadorController, ListarPorAnimalController, ListarPorCuidadorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarEdadMesesController, TrasladarController, ConsultarRefugioController],
  providers: [CuidadoresRepository, CuidadoresService, AsignarCuidadorRepository, AsignarCuidadorService, ListarPorAnimalRepository, ListarPorAnimalService, ListarPorCuidadorRepository, ListarPorCuidadorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarEdadMesesService, TrasladarService, ConsultarRefugioService, CrearListarRepository, EliminarRepository, ModificarEdadMesesRepository, TrasladarRepository, ConsultarRefugioRepository]
})
export class TallerModule {}
