import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PISTA, MODELO_COMPLEJO } from '../../models/complejo-pista.model.mjs';

export async function buscarComplejoRepository(complejoId) {
  const { Item } = await MODELO_COMPLEJO.build(EntityRepository).get(
    { complejoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarComplejoRepository(complejoId, minimo) {
  const { Items = [] } = await MODELO_PISTA.build(EntityRepository).query(
    { index: 'PorComplejo', partition: complejoId },
    { filters: { Pista: { attr: 'superficieM2', gte: minimo } } }
  );
  return Items;
}
