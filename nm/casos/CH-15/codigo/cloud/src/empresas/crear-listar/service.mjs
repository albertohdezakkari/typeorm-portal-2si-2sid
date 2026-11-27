import { crearEmpresaRepository, listarEmpresasRepository } from './repository.mjs';

export async function crearEmpresaService(nombre) {
  const empresaId = Date.now();
  const empresa = { empresaId, nombre };
  await crearEmpresaRepository(empresa);
  return empresa;
}

export function listarEmpresasService() {
  return listarEmpresasRepository();
}