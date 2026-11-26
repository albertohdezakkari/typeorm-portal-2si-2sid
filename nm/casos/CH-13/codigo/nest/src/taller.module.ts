import { Tecnico } from './tecnicos/entities/tecnico.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { TecnicosRepository } from './tecnicos/crear-listar/repository';
import { TecnicosService } from './tecnicos/crear-listar/service';
import { TecnicosController } from './tecnicos/crear-listar/controller';
import { AsignarTecnicoRepository } from './asignaciones/asignar-tecnico/repository';
import { AsignarTecnicoService } from './asignaciones/asignar-tecnico/service';
import { AsignarTecnicoController } from './asignaciones/asignar-tecnico/controller';
import { ListarPorProyeccionRepository } from './asignaciones/listar-por-proyeccion/repository';
import { ListarPorProyeccionService } from './asignaciones/listar-por-proyeccion/service';
import { ListarPorProyeccionController } from './asignaciones/listar-por-proyeccion/controller';
import { ListarPorTecnicoRepository } from './asignaciones/listar-por-tecnico/repository';
import { ListarPorTecnicoService } from './asignaciones/listar-por-tecnico/service';
import { ListarPorTecnicoController } from './asignaciones/listar-por-tecnico/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cine } from './cines/entities/cine.entity';
import { Proyeccion } from './proyecciones/entities/proyeccion.entity';
import { CrearListarController } from './proyecciones/crear-listar/controller';
import { CrearListarService } from './proyecciones/crear-listar/service';
import { CrearListarRepository } from './proyecciones/crear-listar/repository';
import { EliminarController } from './proyecciones/eliminar/controller';
import { EliminarService } from './proyecciones/eliminar/service';
import { EliminarRepository } from './proyecciones/eliminar/repository';
import { ModificarDuracionMinutosController } from './proyecciones/modificar-duracion-minutos/controller';
import { ModificarDuracionMinutosService } from './proyecciones/modificar-duracion-minutos/service';
import { ModificarDuracionMinutosRepository } from './proyecciones/modificar-duracion-minutos/repository';
import { TrasladarController } from './proyecciones/trasladar/controller';
import { TrasladarService } from './proyecciones/trasladar/service';
import { TrasladarRepository } from './proyecciones/trasladar/repository';
import { ConsultarCineController } from './cines/consultar/controller';
import { ConsultarCineService } from './cines/consultar/service';
import { ConsultarCineRepository } from './cines/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cine, Proyeccion, Tecnico, Asignacion])],
  controllers: [TecnicosController, AsignarTecnicoController, ListarPorProyeccionController, ListarPorTecnicoController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDuracionMinutosController, TrasladarController, ConsultarCineController],
  providers: [TecnicosRepository, TecnicosService, AsignarTecnicoRepository, AsignarTecnicoService, ListarPorProyeccionRepository, ListarPorProyeccionService, ListarPorTecnicoRepository, ListarPorTecnicoService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDuracionMinutosService, TrasladarService, ConsultarCineService, CrearListarRepository, EliminarRepository, ModificarDuracionMinutosRepository, TrasladarRepository, ConsultarCineRepository]
})
export class TallerModule {}
