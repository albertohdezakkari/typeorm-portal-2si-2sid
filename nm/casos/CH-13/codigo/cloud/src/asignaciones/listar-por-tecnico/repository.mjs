import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function listarAsignacionesPorTecnicoRepository(tecnicoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorTecnico', partition: tecnicoId }
  );
  return Items;
}
