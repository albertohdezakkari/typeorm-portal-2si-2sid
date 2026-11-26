import { Colaborador } from './colaboradores/entities/colaborador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { ColaboradoresRepository } from './colaboradores/crear-listar/repository';
import { ColaboradoresService } from './colaboradores/crear-listar/service';
import { ColaboradoresController } from './colaboradores/crear-listar/controller';
import { AsignarColaboradorRepository } from './asignaciones/asignar-colaborador/repository';
import { AsignarColaboradorService } from './asignaciones/asignar-colaborador/service';
import { AsignarColaboradorController } from './asignaciones/asignar-colaborador/controller';
import { ListarPorProyectoRepository } from './asignaciones/listar-por-proyecto/repository';
import { ListarPorProyectoService } from './asignaciones/listar-por-proyecto/service';
import { ListarPorProyectoController } from './asignaciones/listar-por-proyecto/controller';
import { ListarPorColaboradorRepository } from './asignaciones/listar-por-colaborador/repository';
import { ListarPorColaboradorService } from './asignaciones/listar-por-colaborador/service';
import { ListarPorColaboradorController } from './asignaciones/listar-por-colaborador/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresas/entities/empresa.entity';
import { Proyecto } from './proyectos/entities/proyecto.entity';
import { CrearListarController } from './proyectos/crear-listar/controller';
import { CrearListarService } from './proyectos/crear-listar/service';
import { CrearListarRepository } from './proyectos/crear-listar/repository';
import { EliminarController } from './proyectos/eliminar/controller';
import { EliminarService } from './proyectos/eliminar/service';
import { EliminarRepository } from './proyectos/eliminar/repository';
import { ModificarHorasEstimadasController } from './proyectos/modificar-horas-estimadas/controller';
import { ModificarHorasEstimadasService } from './proyectos/modificar-horas-estimadas/service';
import { ModificarHorasEstimadasRepository } from './proyectos/modificar-horas-estimadas/repository';
import { TrasladarController } from './proyectos/trasladar/controller';
import { TrasladarService } from './proyectos/trasladar/service';
import { TrasladarRepository } from './proyectos/trasladar/repository';
import { ConsultarEmpresaController } from './empresas/consultar/controller';
import { ConsultarEmpresaService } from './empresas/consultar/service';
import { ConsultarEmpresaRepository } from './empresas/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, Proyecto, Colaborador, Asignacion])],
  controllers: [ColaboradoresController, AsignarColaboradorController, ListarPorProyectoController, ListarPorColaboradorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarHorasEstimadasController, TrasladarController, ConsultarEmpresaController],
  providers: [ColaboradoresRepository, ColaboradoresService, AsignarColaboradorRepository, AsignarColaboradorService, ListarPorProyectoRepository, ListarPorProyectoService, ListarPorColaboradorRepository, ListarPorColaboradorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarHorasEstimadasService, TrasladarService, ConsultarEmpresaService, CrearListarRepository, EliminarRepository, ModificarHorasEstimadasRepository, TrasladarRepository, ConsultarEmpresaRepository]
})
export class TallerModule {}
