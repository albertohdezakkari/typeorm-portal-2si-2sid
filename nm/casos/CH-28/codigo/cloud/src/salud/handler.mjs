export async function handler() {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ estado: 'ok', etapa: 'base-neutral' })
  };
}
