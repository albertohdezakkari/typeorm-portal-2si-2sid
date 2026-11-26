import { crearProyectoRepository, listarProyectosRepository } from './repository.mjs';

export async function crearProyectoService(nombre, horasEstimadas, empresaId) {
  const proyectoId = Date.now();
  const proyecto = { proyectoId, nombre, horasEstimadas, empresaId };
  await crearProyectoRepository(proyecto);
  return proyecto;
}

export function listarProyectosService() {
  return listarProyectosRepository();
}
