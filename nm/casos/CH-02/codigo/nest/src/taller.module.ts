import { Cultivador } from './cultivadores/entities/cultivador.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { CultivadoresRepository } from './cultivadores/crear-listar/repository';
import { CultivadoresService } from './cultivadores/crear-listar/service';
import { CultivadoresController } from './cultivadores/crear-listar/controller';
import { AsignarCultivadorRepository } from './asignaciones/asignar-cultivador/repository';
import { AsignarCultivadorService } from './asignaciones/asignar-cultivador/service';
import { AsignarCultivadorController } from './asignaciones/asignar-cultivador/controller';
import { ListarPorParcelaRepository } from './asignaciones/listar-por-parcela/repository';
import { ListarPorParcelaService } from './asignaciones/listar-por-parcela/service';
import { ListarPorParcelaController } from './asignaciones/listar-por-parcela/controller';
import { ListarPorCultivadorRepository } from './asignaciones/listar-por-cultivador/repository';
import { ListarPorCultivadorService } from './asignaciones/listar-por-cultivador/service';
import { ListarPorCultivadorController } from './asignaciones/listar-por-cultivador/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huerto } from './huertos/entities/huerto.entity';
import { Parcela } from './parcelas/entities/parcela.entity';
import { CrearListarController } from './parcelas/crear-listar/controller';
import { CrearListarService } from './parcelas/crear-listar/service';
import { CrearListarRepository } from './parcelas/crear-listar/repository';
import { EliminarController } from './parcelas/eliminar/controller';
import { EliminarService } from './parcelas/eliminar/service';
import { EliminarRepository } from './parcelas/eliminar/repository';
import { ModificarSuperficieController } from './parcelas/modificar-superficie/controller';
import { ModificarSuperficieService } from './parcelas/modificar-superficie/service';
import { ModificarSuperficieRepository } from './parcelas/modificar-superficie/repository';
import { TrasladarController } from './parcelas/trasladar/controller';
import { TrasladarService } from './parcelas/trasladar/service';
import { TrasladarRepository } from './parcelas/trasladar/repository';
import { ConsultarHuertoController } from './huertos/consultar/controller';
import { ConsultarHuertoService } from './huertos/consultar/service';
import { ConsultarHuertoRepository } from './huertos/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Huerto, Parcela, Cultivador, Asignacion])],
  controllers: [CultivadoresController, AsignarCultivadorController, ListarPorParcelaController, ListarPorCultivadorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarSuperficieController, TrasladarController, ConsultarHuertoController],
  providers: [CultivadoresRepository, CultivadoresService, AsignarCultivadorRepository, AsignarCultivadorService, ListarPorParcelaRepository, ListarPorParcelaService, ListarPorCultivadorRepository, ListarPorCultivadorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarSuperficieService, TrasladarService, ConsultarHuertoService, CrearListarRepository, EliminarRepository, ModificarSuperficieRepository, TrasladarRepository, ConsultarHuertoRepository]
})
export class TallerModule {}
