import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EXCURSION, MODELO_AGENCIA } from '../../models/agencia-excursion.model.mjs';

export async function buscarAgenciaRepository(agenciaId) {
  const { Item } = await MODELO_AGENCIA.build(EntityRepository).get(
    { agenciaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarAgenciaRepository(agenciaId, minimo) {
  const { Items = [] } = await MODELO_EXCURSION.build(EntityRepository).query(
    { index: 'PorAgencia', partition: agenciaId },
    { filters: { Excursion: { attr: 'duracionHoras', gte: minimo } } }
  );
  return Items;
}
