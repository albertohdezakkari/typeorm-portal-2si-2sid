import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCUMENTO, MODELO_ARCHIVO } from '../../models/archivo-documento.model.mjs';

export async function eliminarDocumentoRepository(documentoId) {
  await MODELO_DOCUMENTO.build(EntityRepository).delete(
    { documentoId }
  );
}
