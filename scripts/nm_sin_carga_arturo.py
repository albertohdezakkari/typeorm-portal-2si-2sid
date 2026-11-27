"""Arturo: N:M continúa la aplicación existente; las altas pasan por Controller.

No hay fase de precarga ni fichero de IDs en el recorrido Nest N:M.
Serverless y los recorridos de los demás alumnos se conservan.
"""
from copy import deepcopy
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
REMOVED={'datos','cargar'}
CHANGED={'crear-listar-curl','asignar-profesional-curl','listar-por-obra-curl','listar-por-profesional-curl','modificar-rol-curl','eliminar-asignacion-curl','persistencia'}
NOTE='Terminal 2: utiliza las rutas de tu Controller. En los ejemplos se usa la obra 7 y el profesional 1. Sustituye esos números por el ID de una obra que ya exista (GET /obras) y por el ID devuelto al crear el profesional. Conserva esos mismos dos IDs en las pruebas siguientes.'
TESTS={
'crear-listar-curl':'''curl -i -X POST "http://localhost:3000/profesionales" \\
  -H 'Content-Type: application/json' \\
  -d '{"nombre":"Diego","apellidos":"Ruiz López","email":"diego.ruiz@example.test"}'
curl -i "http://localhost:3000/profesionales"''',
'asignar-profesional-curl':'''curl -i http://localhost:3000/obras
curl -i -X POST "http://localhost:3000/obras/7/asignaciones" \\
  -H 'Content-Type: application/json' \\
  -d '{"profesionalId":1,"rol":"Electricista"}' ''',
'listar-por-obra-curl':'curl -i "http://localhost:3000/obras/7/asignaciones"',
'listar-por-profesional-curl':'curl -i "http://localhost:3000/profesionales/1/asignaciones"',
'modificar-rol-curl':'''curl -i -X PATCH "http://localhost:3000/obras/7/asignaciones/1" \\
  -H 'Content-Type: application/json' \\
  -d '{"rol":"Jefe de equipo"}' ''',
'eliminar-asignacion-curl':'curl -i -X DELETE "http://localhost:3000/obras/7/asignaciones/1"',
'persistencia':'''curl -i "http://localhost:3000/obras/7/asignaciones"
curl -i http://localhost:3000/obras
curl -i http://localhost:3000/profesionales'''
}
EXPECT={
3:'POST devuelve el profesional creado con su ID. GET permite comprobar que está guardado. Copia el ID real de la respuesta para el caso siguiente.',
4:'POST crea la asignación de una obra existente con el profesional que acabas de crear. Repetir esa pareja devuelve 409.',
5:'GET devuelve las asignaciones de esa obra. Tras la primera prueba aparece el vínculo que has creado con el POST.',
6:'GET devuelve las obras en las que participa ese profesional. No presupone asignaciones cargadas previamente.',
7:'PATCH cambia únicamente el rol de la pareja de IDs que has creado; conserva la obra y el profesional.',
8:'DELETE devuelve 204 y elimina solo la asignación indicada; la obra y el profesional siguen existiendo.'
}

def apply(d,files):
    if d.get('caseId')!='CH-22':return
    files.pop('src/datos/cargar-datos-nm.ts',None)
    if d.get('nestWithoutSeed'):return
    old=deepcopy(d['tracks']['nest']);revision=str(d.get('nestSimpleRevision',3))
    d.setdefault('nestPreviousIds',{})[revision]=[s['id']for s in old]
    d.setdefault('nestRetainedByRevision',{})[revision]=[s['id']for s in old if s['id']not in REMOVED|CHANGED]
    d.setdefault('nestStepAliases',{}).update({'datos':'crear-listar-service','cargar':'crear-listar-service'})
    d['nestSimpleRevision']=4;d['nestWithoutSeed']=True
    stages=[s for s in d['tracks']['nest']if s['id']not in REMOVED]
    # Primero se crean las dos Entities nuevas; después se amplía la Entity existente.
    ids=['retomar','profesional','asig-inversas','obra-inversa','profesionales-modulo','asignaciones-modulo','registrar','arrancar']
    chapter=[next(s for s in stages if s['id']==id)for id in ids]
    d['tracks']['nest']=[s for s in stages if s['chapter']==0]+chapter+[s for s in stages if s['chapter']>1]
    for s in d['tracks']['nest']:
        if s['chapter']in EXPECT:s['expect']=EXPECT[s['chapter']]
        if s['id']=='retomar':
            s['expect']='Tu API 1:N sigue funcionando: /salud y /obras devuelven HTTP 200. Conserva las obras y sus IDs; este bloque solo añade Profesional y Asignacion.'
        if s['id']=='profesional':
            s['title']='Crea la Entity Profesional'
            s['note']='Antes de editar las Entities, detén Nest con Ctrl+C en Terminal 1. Crea las dos Entities y configura sus módulos antes de volver a compilar. Este archivo define al profesional y su colección de asignaciones.'
        if s['id']=='asig-inversas':s['title']='Crea la Entity Asignacion y sus relaciones'
        if s['id']=='obra-inversa':s['title']='Relaciona la Obra existente con Asignacion'
        if s['id']=='arrancar':
            s['expect']='Nest compila y arranca. TypeORM crea PROFESIONAL y ASIGNACION desde las Entities y conserva AYUNTAMIENTO y OBRA. Todavía no hay que crear vínculos.'
        if s['id']in TESTS:
            s['code']=TESTS[s['id']].rstrip();s['note']=NOTE;s['cues']=[]
        if s['id']=='crear-listar-curl':
            s['note']='Terminal 2: ejecuta POST para crear un profesional a través del Controller y su Service. Anota el ID que devuelve la respuesta; GET lista los profesionales. Los ejemplos siguientes usan profesional 1: si recibes otro ID, utiliza el tuyo.'
        if s['id']=='persistencia':
            s['expect']='La pareja eliminada ya no aparece. La obra y el profesional siguen en sus listados; si habías creado más asignaciones, se conservan las demás.'
        if s['id']=='repaso':
            s['note']='Para practicar una N:M con más filas, repite los mismos POST: crea otro profesional, asígnalo a la misma obra y asigna un profesional a otra obra. Todos los datos se crean mediante los Controllers que has programado.'
        assert 'ids-aula.env'not in json.dumps(s,ensure_ascii=False),s['id']


def main():
    p=ROOT/'nm/CH-22.json';d=json.loads(p.read_text());apply(d,{})
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    stale=ROOT/'nm/codigo/nest/src/datos/cargar-datos-nm.ts'
    if stale.exists():stale.unlink()
    print('Arturo Nest N:M: dos Entities nuevas, módulos y seis casos; sin precarga ni fichero de IDs.')

if __name__=='__main__':main()
