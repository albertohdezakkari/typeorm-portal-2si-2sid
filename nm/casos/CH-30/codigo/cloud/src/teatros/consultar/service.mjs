import { buscarTeatroRepository, consultarTeatroRepository } from './repository.mjs';

export async function consultarTeatroService(teatroId, minimo) {
  const teatro = await buscarTeatroRepository(teatroId);
  if (!teatro) throw new Error('Teatro no encontrado');
  const funciones = await consultarTeatroRepository(teatroId, minimo);
  return { teatro, funciones };
}
