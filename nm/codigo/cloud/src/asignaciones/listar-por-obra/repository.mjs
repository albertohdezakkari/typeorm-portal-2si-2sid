import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function listarAsignacionesPorObraRepository(obraId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: obraId },
    { consistent: true }
  );
  return Items;
}
