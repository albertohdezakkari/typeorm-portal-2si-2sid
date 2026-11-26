import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function listarAsignacionesPorPlazaRepository(plazaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: plazaId },
    { consistent: true }
  );
  return Items;
}
