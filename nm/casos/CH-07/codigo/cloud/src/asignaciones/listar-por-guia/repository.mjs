import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/guia-asignacion.model.mjs';

export async function listarAsignacionesPorGuiaRepository(guiaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorGuia', partition: guiaId }
  );
  return Items;
}
