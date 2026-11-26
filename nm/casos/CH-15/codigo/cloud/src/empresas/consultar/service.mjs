import { buscarEmpresaRepository, consultarEmpresaRepository } from './repository.mjs';

export async function consultarEmpresaService(empresaId, minimo) {
  const empresa = await buscarEmpresaRepository(empresaId);
  if (!empresa) throw new Error('Empresa no encontrado');
  const proyectos = await consultarEmpresaRepository(empresaId, minimo);
  return { empresa, proyectos };
}
