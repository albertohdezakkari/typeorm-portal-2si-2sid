import { Locutor } from './locutores/entities/locutor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { LocutoresRepository } from './locutores/crear-listar/repository';
import { LocutoresService } from './locutores/crear-listar/service';
import { LocutoresController } from './locutores/crear-listar/controller';
import { AsignarLocutorRepository } from './asignaciones/asignar-locutor/repository';
import { AsignarLocutorService } from './asignaciones/asignar-locutor/service';
import { AsignarLocutorController } from './asignaciones/asignar-locutor/controller';
import { ListarPorProgramaRepository } from './asignaciones/listar-por-programa/repository';
import { ListarPorProgramaService } from './asignaciones/listar-por-programa/service';
import { ListarPorProgramaController } from './asignaciones/listar-por-programa/controller';
import { ListarPorLocutorRepository } from './asignaciones/listar-por-locutor/repository';
import { ListarPorLocutorService } from './asignaciones/listar-por-locutor/service';
import { ListarPorLocutorController } from './asignaciones/listar-por-locutor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emisora } from './emisoras/entities/emisora.entity';
import { Programa } from './programas/entities/programa.entity';
import { CrearListarController } from './programas/crear-listar/controller';
import { CrearListarService } from './programas/crear-listar/service';
import { CrearListarRepository } from './programas/crear-listar/repository';
import { EliminarController } from './programas/eliminar/controller';
import { EliminarService } from './programas/eliminar/service';
import { EliminarRepository } from './programas/eliminar/repository';
import { ModificarDuracionMinutosController } from './programas/modificar-duracion-minutos/controller';
import { ModificarDuracionMinutosService } from './programas/modificar-duracion-minutos/service';
import { ModificarDuracionMinutosRepository } from './programas/modificar-duracion-minutos/repository';
import { TrasladarController } from './programas/trasladar/controller';
import { TrasladarService } from './programas/trasladar/service';
import { TrasladarRepository } from './programas/trasladar/repository';
import { ConsultarEmisoraController } from './emisoras/consultar/controller';
import { ConsultarEmisoraService } from './emisoras/consultar/service';
import { ConsultarEmisoraRepository } from './emisoras/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Emisora, Programa, Locutor, Asignacion])],
  controllers: [LocutoresController, AsignarLocutorController, ListarPorProgramaController, ListarPorLocutorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarDuracionMinutosController, TrasladarController, ConsultarEmisoraController],
  providers: [LocutoresRepository, LocutoresService, AsignarLocutorRepository, AsignarLocutorService, ListarPorProgramaRepository, ListarPorProgramaService, ListarPorLocutorRepository, ListarPorLocutorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarDuracionMinutosService, TrasladarService, ConsultarEmisoraService, CrearListarRepository, EliminarRepository, ModificarDuracionMinutosRepository, TrasladarRepository, ConsultarEmisoraRepository]
})
export class TallerModule {}
