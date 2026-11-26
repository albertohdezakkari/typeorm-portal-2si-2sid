import { buscarEmisoraRepository, consultarEmisoraRepository } from './repository.mjs';

export async function consultarEmisoraService(emisoraId, minimo) {
  const emisora = await buscarEmisoraRepository(emisoraId);
  if (!emisora) throw new Error('Emisora no encontrado');
  const programas = await consultarEmisoraRepository(emisoraId, minimo);
  return { emisora, programas };
}
