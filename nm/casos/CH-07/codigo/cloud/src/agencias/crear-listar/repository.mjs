import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AGENCIA } from '../../models/agencia-excursion.model.mjs';

export async function crearAgenciaRepository(agencia) {
  await MODELO_AGENCIA.build(EntityRepository).put(
    agencia,
    { condition: { attr: 'agenciaId', exists: false } }
  );
}

export async function listarAgenciasRepository() {
  const { Items = [] } = await MODELO_AGENCIA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}