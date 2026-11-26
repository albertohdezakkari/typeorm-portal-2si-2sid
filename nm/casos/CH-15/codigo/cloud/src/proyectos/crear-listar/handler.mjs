import { crearProyectoService, listarProyectosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, horasEstimadas, empresaId } = JSON.parse(event.body);
  const proyecto = await crearProyectoService(nombre, horasEstimadas, empresaId);
  return { statusCode: 201, body: JSON.stringify(proyecto) };
}

export async function listarHandler() {
  const proyectos = await listarProyectosService();
  return { statusCode: 200, body: JSON.stringify(proyectos) };
}
