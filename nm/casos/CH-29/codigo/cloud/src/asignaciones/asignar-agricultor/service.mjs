import { buscarCosechaRepository, buscarAgricultorRepository, asignarAgricultorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarAgricultorService(cosechaId, agricultorId, rol) {
  const cosecha = await buscarCosechaRepository(cosechaId);
  const agricultor = await buscarAgricultorRepository(agricultorId);
  if (!cosecha || !agricultor) {
    throw new ReferenciaInexistenteError('No existe la cosecha o el agricultor');
  }
  return asignarAgricultorRepository(cosechaId, agricultorId, rol);
}
