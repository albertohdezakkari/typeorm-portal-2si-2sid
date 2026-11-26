import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COLABORADOR } from '../../models/colaborador-asignacion.model.mjs';

export async function crearColaboradorRepository(colaborador) {
  await MODELO_COLABORADOR.build(EntityRepository).put(
    colaborador,
    { condition: { attr: 'colaboradorId', exists: false } }
  );
}

export async function listarColaboradoresRepository() {
  const { Items = [] } = await MODELO_COLABORADOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
