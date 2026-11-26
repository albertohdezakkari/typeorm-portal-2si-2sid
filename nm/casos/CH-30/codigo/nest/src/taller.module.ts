import { Interprete } from './interpretes/entities/interprete.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { InterpretesRepository } from './interpretes/crear-listar/repository';
import { InterpretesService } from './interpretes/crear-listar/service';
import { InterpretesController } from './interpretes/crear-listar/controller';
import { AsignarInterpreteRepository } from './asignaciones/asignar-interprete/repository';
import { AsignarInterpreteService } from './asignaciones/asignar-interprete/service';
import { AsignarInterpreteController } from './asignaciones/asignar-interprete/controller';
import { ListarPorFuncionRepository } from './asignaciones/listar-por-funcion/repository';
import { ListarPorFuncionService } from './asignaciones/listar-por-funcion/service';
import { ListarPorFuncionController } from './asignaciones/listar-por-funcion/controller';
import { ListarPorInterpreteRepository } from './asignaciones/listar-por-interprete/repository';
import { ListarPorInterpreteService } from './asignaciones/listar-por-interprete/service';
import { ListarPorInterpreteController } from './asignaciones/listar-por-interprete/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teatro } from './teatros/entities/teatro.entity';
import { Funcion } from './funciones/entities/funcion.entity';
import { CrearListarController } from './funciones/crear-listar/controller';
import { CrearListarService } from './funciones/crear-listar/service';
import { CrearListarRepository } from './funciones/crear-listar/repository';
import { EliminarController } from './funciones/eliminar/controller';
import { EliminarService } from './funciones/eliminar/service';
import { EliminarRepository } from './funciones/eliminar/repository';
import { ModificarAforoController } from './funciones/modificar-aforo/controller';
import { ModificarAforoService } from './funciones/modificar-aforo/service';
import { ModificarAforoRepository } from './funciones/modificar-aforo/repository';
import { TrasladarController } from './funciones/trasladar/controller';
import { TrasladarService } from './funciones/trasladar/service';
import { TrasladarRepository } from './funciones/trasladar/repository';
import { ConsultarTeatroController } from './teatros/consultar/controller';
import { ConsultarTeatroService } from './teatros/consultar/service';
import { ConsultarTeatroRepository } from './teatros/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Teatro, Funcion, Interprete, Asignacion])],
  controllers: [InterpretesController, AsignarInterpreteController, ListarPorFuncionController, ListarPorInterpreteController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarAforoController, TrasladarController, ConsultarTeatroController],
  providers: [InterpretesRepository, InterpretesService, AsignarInterpreteRepository, AsignarInterpreteService, ListarPorFuncionRepository, ListarPorFuncionService, ListarPorInterpreteRepository, ListarPorInterpreteService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarAforoService, TrasladarService, ConsultarTeatroService, CrearListarRepository, EliminarRepository, ModificarAforoRepository, TrasladarRepository, ConsultarTeatroRepository]
})
export class TallerModule {}
