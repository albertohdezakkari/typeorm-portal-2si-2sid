import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA } from '../../models/urbanizacion-plaza.model.mjs';
import { MODELO_TECNICO, MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function buscarPlazaRepository(plazaId) {
  const { Item } = await MODELO_PLAZA.build(EntityRepository).get(
    { plazaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarTecnicoRepository(tecnicoId) {
  const { Item } = await MODELO_TECNICO.build(EntityRepository).get(
    { tecnicoId },
    { consistent: true }
  );
  return Item;
}

export async function asignarTecnicoRepository(plazaId, tecnicoId, rol) {
  const asignacion = { plazaId, tecnicoId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'plazaId', exists: false } }
  );
  return asignacion;
}
