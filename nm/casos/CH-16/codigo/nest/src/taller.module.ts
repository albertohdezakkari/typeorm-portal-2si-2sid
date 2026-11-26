import { Vendedor } from './vendedores/entities/vendedor.entity';
import { Asignacion } from './asignaciones/entities/asignacion.entity';
import { VendedoresRepository } from './vendedores/crear-listar/repository';
import { VendedoresService } from './vendedores/crear-listar/service';
import { VendedoresController } from './vendedores/crear-listar/controller';
import { AsignarVendedorRepository } from './asignaciones/asignar-vendedor/repository';
import { AsignarVendedorService } from './asignaciones/asignar-vendedor/service';
import { AsignarVendedorController } from './asignaciones/asignar-vendedor/controller';
import { ListarPorArticuloRepository } from './asignaciones/listar-por-articulo/repository';
import { ListarPorArticuloService } from './asignaciones/listar-por-articulo/service';
import { ListarPorArticuloController } from './asignaciones/listar-por-articulo/controller';
import { ListarPorVendedorRepository } from './asignaciones/listar-por-vendedor/repository';
import { ListarPorVendedorService } from './asignaciones/listar-por-vendedor/service';
import { ListarPorVendedorController } from './asignaciones/listar-por-vendedor/controller';
import { ModificarRolRepository } from './asignaciones/modificar-rol/repository';
import { ModificarRolService } from './asignaciones/modificar-rol/service';
import { ModificarRolController } from './asignaciones/modificar-rol/controller';
import { EliminarAsignacionRepository } from './asignaciones/eliminar-asignacion/repository';
import { EliminarAsignacionService } from './asignaciones/eliminar-asignacion/service';
import { EliminarAsignacionController } from './asignaciones/eliminar-asignacion/controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from './tiendas/entities/tienda.entity';
import { Articulo } from './articulos/entities/articulo.entity';
import { CrearListarController } from './articulos/crear-listar/controller';
import { CrearListarService } from './articulos/crear-listar/service';
import { CrearListarRepository } from './articulos/crear-listar/repository';
import { EliminarController } from './articulos/eliminar/controller';
import { EliminarService } from './articulos/eliminar/service';
import { EliminarRepository } from './articulos/eliminar/repository';
import { ModificarStockController } from './articulos/modificar-stock/controller';
import { ModificarStockService } from './articulos/modificar-stock/service';
import { ModificarStockRepository } from './articulos/modificar-stock/repository';
import { TrasladarController } from './articulos/trasladar/controller';
import { TrasladarService } from './articulos/trasladar/service';
import { TrasladarRepository } from './articulos/trasladar/repository';
import { ConsultarTiendaController } from './tiendas/consultar/controller';
import { ConsultarTiendaService } from './tiendas/consultar/service';
import { ConsultarTiendaRepository } from './tiendas/consultar/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda, Articulo, Vendedor, Asignacion])],
  controllers: [VendedoresController, AsignarVendedorController, ListarPorArticuloController, ListarPorVendedorController, ModificarRolController, EliminarAsignacionController, CrearListarController, EliminarController, ModificarStockController, TrasladarController, ConsultarTiendaController],
  providers: [VendedoresRepository, VendedoresService, AsignarVendedorRepository, AsignarVendedorService, ListarPorArticuloRepository, ListarPorArticuloService, ListarPorVendedorRepository, ListarPorVendedorService, ModificarRolRepository, ModificarRolService, EliminarAsignacionRepository, EliminarAsignacionService, CrearListarService, EliminarService, ModificarStockService, TrasladarService, ConsultarTiendaService, CrearListarRepository, EliminarRepository, ModificarStockRepository, TrasladarRepository, ConsultarTiendaRepository]
})
export class TallerModule {}
