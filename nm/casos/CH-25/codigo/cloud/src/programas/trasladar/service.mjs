import { trasladarProgramaRepository } from './repository.mjs';
import { buscarEmisoraRepository } from '../../emisoras/consultar/repository.mjs';

export async function trasladarProgramaService(programaId, emisoraId) {
  const emisora = await buscarEmisoraRepository(emisoraId);
  if (!emisora) throw new Error('Emisora no encontrado');
  return trasladarProgramaRepository(programaId, emisoraId);
}
