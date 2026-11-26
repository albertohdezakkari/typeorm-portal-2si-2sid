import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/revisor-asignacion.model.mjs';

export async function listarAsignacionesPorDocumentoRepository(documentoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: documentoId },
    { consistent: true }
  );
  return Items;
}
