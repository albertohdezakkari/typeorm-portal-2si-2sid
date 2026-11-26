import { Revisor } from './revisores/entities/revisor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { RevisoresRepository } from './revisores/crear-listar/repository';
import { RevisoresService } from './revisores/crear-listar/service';
import { RevisoresController } from './revisores/crear-listar/controller';
import { AsignarRevisorRepository } from './asignaciones/asignar-revisor/repository';
import { AsignarRevisorService } from './asignaciones/asignar-revisor/service';
import { AsignarRevisorController } from './asignaciones/asignar-revisor/controller';
import { ListarPorDocumentoRepository } from './asignaciones/listar-por-documento/repository';
import { ListarPorDocumentoService } from './asignaciones/listar-por-documento/service';
import { ListarPorDocumentoController } from './asignaciones/listar-por-documento/controller';
import { ListarPorRevisorRepository } from './asignaciones/listar-por-revisor/repository';
import { ListarPorRevisorService } from './asignaciones/listar-por-revisor/service';
import { ListarPorRevisorController } from './asignaciones/listar-por-revisor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './archivos/entities/archivo.entity';
import { Documento } from './documentos/entities/documento.entity';
import { CrearListarController } from './documentos/crear-listar/controller';
import { CrearListarService } from './documentos/crear-listar/service';
import { CrearListarRepository } from './documentos/crear-listar/repository';
import { EliminarController } from './documentos/eliminar/controller';
import { EliminarService } from './documentos/eliminar/service';
import { EliminarRepository } from './documentos/eliminar/repository';
import { ModificarPaginasController } from './documentos/modificar-paginas/controller';
import { ModificarPaginasService } from './documentos/modificar-paginas/service';
import { ModificarPaginasRepository } from './documentos/modificar-paginas/repository';
import { TrasladarController } from './documentos/trasladar/controller';
import { TrasladarService } from './documentos/trasladar/service';
import { TrasladarRepository } from './documentos/trasladar/repository';
import { ConsultarArchivoController } from './archivos/consultar/controller';
import { ConsultarArchivoService } from './archivos/consultar/service';
import { ConsultarArchivoRepository } from './archivos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Archivo, Documento, Revisor, Asignacion])],
  controllers: [RevisoresController, AsignarRevisorController, ListarPorDocumentoController, ListarPorRevisorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarPaginasController, TrasladarController, ConsultarArchivoController],
  providers: [RevisoresRepository, RevisoresService, AsignarRevisorRepository, AsignarRevisorService, ListarPorDocumentoRepository, ListarPorDocumentoService, ListarPorRevisorRepository, ListarPorRevisorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarPaginasService, TrasladarService, ConsultarArchivoService, CrearListarRepository, EliminarRepository, ModificarPaginasRepository, TrasladarRepository, ConsultarArchivoRepository]
})
export class TallerModule {}
