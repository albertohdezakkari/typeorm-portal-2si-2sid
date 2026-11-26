import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/panadero-asignacion.model.mjs';

export async function listarAsignacionesPorPanaderoRepository(panaderoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorPanadero', partition: panaderoId }
  );
  return Items;
}
