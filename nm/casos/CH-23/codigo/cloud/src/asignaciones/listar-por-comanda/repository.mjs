import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cocinero-asignacion.model.mjs';

export async function listarAsignacionesPorComandaRepository(comandaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: comandaId },
    { consistent: true }
  );
  return Items;
}
