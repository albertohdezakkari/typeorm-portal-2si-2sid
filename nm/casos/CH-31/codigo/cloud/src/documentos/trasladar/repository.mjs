import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCUMENTO, MODELO_ARCHIVO } from '../../models/archivo-documento.model.mjs';

export async function trasladarDocumentoRepository(documentoId, archivoId) {
  const { Attributes } = await MODELO_DOCUMENTO.build(EntityRepository).update(
    { documentoId, archivoId },
    {
      condition: { attr: 'documentoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
