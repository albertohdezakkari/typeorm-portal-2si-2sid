"""Fichas legibles a partir del mismo código del cuaderno N:M."""
from pathlib import Path
import json,textwrap,shutil
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4,landscape
from reportlab.lib.colors import HexColor,white
from reportlab.lib.utils import ImageReader
R=Path(__file__).resolve().parents[1];N=R/'nm';D=json.loads((N/'CH-22.json').read_text());O=R.parent/'output/pdf/nm-arturo-fichas.pdf';O.parent.mkdir(exist_ok=True,parents=True)
W,H=landscape(A4);M=32;G=22;CW=(W-2*M-G)/2;INK=HexColor('#244f43');LINE=HexColor('#c5d5bc');PALE=HexColor('#f3f7ed');DARK=HexColor('#173c32')
c=canvas.Canvas(str(O),pagesize=(W,H));c.setTitle('CH-22 · Obras y profesionales · N:M');c.setAuthor('Cuaderno de aula')
page=0

def start(title,subtitle):
 global page
 page+=1;c.setFillColor(white);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(INK);c.setFont('Helvetica-Bold',10);c.drawString(M,H-27,'CH-22  /  OBRAS Y PROFESIONALES  /  AMPLIACIÓN N:M')
 c.setFont('Helvetica-Bold',21);c.drawString(M,H-54,title)
 c.setFillColor(HexColor('#63775e'));c.setFont('Helvetica',10);c.drawString(M,H-72,subtitle)
 c.setStrokeColor(LINE);c.line(M,29,W-M,29);c.setFont('Helvetica',8);c.drawString(M,17,'Nest + TypeORM / Serverless + DynamoDB Toolbox · Código completo y práctica en el cuaderno web');c.drawRightString(W-M,17,str(page))
 return H-94

def text(x,y,s,width=CW,font=10,leading=14,bold=False):
 c.setFont('Helvetica-Bold' if bold else 'Helvetica',font);c.setFillColor(INK)
 for paragraph in s.split('\n'):
  for line in textwrap.wrap(paragraph,width=int(width/(font*.51))) or ['']:
   c.drawString(x,y,line);y-=leading
 return y-4

def block(x,y,title,source,width=CW,font=8.2):
 # El ajuste visual no cambia el texto de los archivos fuente.
 lines=[]
 for line in source.rstrip().split('\n'):
  wrapped=textwrap.wrap(line,width=int((width-20)/(font*.6)),replace_whitespace=False,drop_whitespace=False) or ['']
  lines.extend(wrapped)
 leading=font*1.27;h=27+leading*len(lines)+10
 assert y-h>35,(page,title,y,h,len(lines))
 c.setFillColor(PALE);c.setStrokeColor(LINE);c.roundRect(x,y-h,width,h,7,fill=1,stroke=1)
 c.setFillColor(INK);c.setFont('Helvetica-Bold',9);c.drawString(x+10,y-16,title)
 c.setFont('Courier',font)
 for i,line in enumerate(lines):c.drawString(x+10,y-32-i*leading,line)
 return y-h-13

def file(tech,path):return (N/'codigo'/tech/path).read_text()
def end():c.showPage()

Y=start('El modelo lógico que vas a construir','Conserva Ayuntamiento-Obra (1:N) y añade Obra-Profesional mediante ASIGNACION.')
image=ImageReader(str(R.parent/'output/preview/nm-ayuntamiento/esquema-logico.png'))
c.drawImage(image,M,51,width=W-2*M,height=Y-46,preserveAspectRatio=True,anchor='c',mask='auto');end()

Y=start('De la relación a las tablas y al índice','YAML crea recursos. Table describe las claves. Entity declara TODOS los atributos del ítem.')
yamlfile=file('cloud','serverless.yml');assignment=yamlfile[yamlfile.index('    TablaAsignaciones:'):yamlfile.index('  Outputs:')]
block(M,Y,'serverless.yml · recurso nuevo ASIGNACIONES',assignment,font=8)
x=M+CW+G;y=Y
y=text(x,y,'Cuatro tablas, conservando las dos anteriores',bold=True,font=12)
y=block(x,y,'PROFESIONALES',"PK: PROFESIONAL_ID\nDatos: NOMBRE, APELLIDOS, EMAIL",font=10)
y=block(x,y,'ASIGNACIONES',"PK: OBRA_ID\nSK: PROFESIONAL_ID\nDato: ROL\nClave primaria: (OBRA_ID, PROFESIONAL_ID)",font=10)
y=block(x,y,'PorProfesional · lectura inversa',"PK: PROFESIONAL_ID\nSK: OBRA_ID\nINCLUDE: claves + ROL",font=10)
y=text(x,y,'El índice copia campos de ASIGNACIONES. Los nombres y correos siguen en PROFESIONALES. No hay JOIN automático ni FK automática en DynamoDB.',font=10)
y=text(x,y,'En la tabla, Query agrupa por obra. En el índice, Query agrupa por profesional. Get, Update y Delete de una asignación necesitan ambos IDs.',font=10);end()

Y=start('Las Entities de Nest + TypeORM','ASIGNACION es una Entity explícita porque el vínculo tiene un dato propio: ROL.')
y=block(M,Y,'Profesional · archivo completo',file('nest','src/profesionales/entities/profesional.entity.ts'),font=8.4)
text(M,y,'Obra conserva su relación con Ayuntamiento. La colección asignaciones se añade cuando ya existe la Entity Asignacion.',font=10)
block(M+CW+G,Y,'Asignacion · archivo completo',file('nest','src/asignaciones/entities/asignacion.entity.ts'),font=8.4);end()

Y=start('Table y Entity en DynamoDB Toolbox','El YAML pasa el nombre real por Ref. savedAs traduce entre los nombres JavaScript y los atributos guardados.')
model=file('cloud','src/models/profesional-asignacion.model.mjs');i=model.index('export const MODELO_PROFESIONAL')
block(M,Y,'Table · imports, claves e índice',model[:i],font=8.5)
y=block(M+CW+G,Y,'Entity · todos los atributos',model[i:],font=8.5)
text(M+CW+G,y,'entityAttribute: false omite la etiqueta interna de entidad. timestamps: false omite fechas automáticas. No elimina los campos de tu modelo.',font=10);end()

Y=start('Traza Nest · recibe y organiza la asignación','POST /obras/8/asignaciones con profesionalId = 2 y rol = Arquitecta.')
y=block(M,Y,'controller.ts · archivo completo',file('nest','src/asignaciones/asignar-profesional/controller.ts'),font=8.5)
y=text(M,y,'1. @Param extrae obraId de la ruta.\n2. @Body recibe profesionalId y rol.\n3. El Controller llama al Service con esos tres valores.',font=11,leading=16)
y=text(M,y,'La respuesta del Repository vuelve al Service y después al Controller. Nest serializa el objeto de resultado a JSON.',font=10)
block(M+CW+G,Y,'service.ts · archivo completo',file('nest','src/asignaciones/asignar-profesional/service.ts'),font=8.1);end()

Y=start('Traza Nest · el Repository guarda la pareja','La PK compuesta impide duplicar (8,2). Insertar no debe sobrescribir el rol de una asociación previa.')
block(M,Y,'repository.ts · archivo completo',file('nest','src/asignaciones/asignar-profesional/repository.ts'),font=8.4)
x=M+CW+G;y=Y
y=text(x,y,'Sigue los valores que viajan',font=14,bold=True)
for title,body in [('Petición','obraId = 8\nprofesionalId = 2\nrol = Arquitecta'),('Lecturas','buscarObraRepository(8)\nbuscarProfesionalRepository(2)'),('Escritura','asignarProfesionalRepository(8, 2, Arquitecta)\nINSERT en ASIGNACION'),('Respuesta','HTTP 201\n{ obraId: 8, profesionalId: 2, rol: Arquitecta }')]:y=block(x,y,title,body,font=10)
text(x,y,'Si falta un extremo: 404. Si la pareja ya existe: 409. Ninguna de esas dos situaciones debe modificar datos existentes.',font=10);end()

Y=start('Traza Serverless · Handler, Service y Repository','HTTP API e Invoke llegan al mismo handler. El evento debe conservar pathParameters y body.')
y=block(M,Y,'handler.mjs · archivo completo',file('cloud','src/asignaciones/asignar-profesional/handler.mjs'),font=8)
block(M,y,'service.mjs · archivo completo',file('cloud','src/asignaciones/asignar-profesional/service.mjs'),font=8)
y=block(M+CW+G,Y,'repository.mjs · archivo completo',file('cloud','src/asignaciones/asignar-profesional/repository.mjs'),font=8)
text(M+CW+G,y,'La condición se comprueba sobre el ítem identificado por AMBAS claves. Rechaza (8,2) si ya existe; permite (8,1) o (7,2).',font=10);end()

Y=start('Practica los seis casos en orden','Usa API_URL=http://localhost:3000 en Nest; en AWS conserva la URL real obtenida al desplegar.')
for idx,case in enumerate(D['cases'],1):
 col=(idx-1)%2;row=(idx-1)//2;x=M+col*(CW+G);y=Y-row*149
 c.setStrokeColor(LINE);c.setFillColor(PALE);c.roundRect(x,y-136,CW,136,7,fill=1,stroke=1)
 c.setFillColor(INK);c.setFont('Helvetica-Bold',10);c.drawString(x+10,y-17,f"0{idx} · {case['title']}")
 c.setFont('Courier',8);c.drawString(x+10,y-33,case['cmd'])
 source=next(s['code'] for s in D['tracks']['cloud'] if s['id']==case['slug']+'-curl')
 yy=y-50;c.setFont('Courier',7.8)
 for line in source.split('\n'):
  for line in textwrap.wrap(line,width=72,replace_whitespace=False,drop_whitespace=False) or ['']:
   c.drawString(x+10,yy,line);yy-=9.5
 text(x+10,min(yy-5,y-94),case['expect'],width=CW-20,font=8.2,leading=10)
end()

Y=start('Invoke, respuesta y persistencia','Invoke llama a Lambda directamente. curl entra por HTTP API. El handler y su contrato son los mismos.')
x=M;y=Y
y=block(x,y,'1 · peticiones/nm-2.json · contenido completo',file('cloud','peticiones/nm-2.json'),font=10)
invoke=next(s['code'] for s in D['tracks']['cloud'] if s['id']=='asignar-profesional-invoke')
y=block(x,y,'2 · Terminal · llama al handler declarado en el YAML',invoke,font=9)
y=text(x,y,'body es texto JSON dentro del evento. pathParameters contiene obraId de la ruta. fileb:// lee los bytes del archivo JSON. No cambies la forma del evento al pasar de curl a Invoke.',font=10)
x=M+CW+G;y=Y
y=text(x,y,'Estado final tras los seis casos',font=14,bold=True)
y=block(x,y,'ASIGNACION / ASIGNACIONES',"OBRA  PROFESIONAL  ROL\n7     2            Arquitecta\n8     1            Coordinador\n8     2            Arquitecta",font=10)
y=text(x,y,'Solo desaparece (7,1). Las obras y los profesionales permanecen. La obra 7 mantiene presupuesto 15000 y ayuntamiento 2, como al finalizar el 1:N.',font=11,leading=15)
y=text(x,y,'Repasa antes de cerrar',font=13,bold=True)
for item in ['Diferencio PK simple y compuesta.','Sé leer la tabla y el índice inverso.','Sé por qué ROL pertenece a la asociación.','Puedo localizar cada método llamado en su archivo.','He guardado las peticiones y sus respuestas reales.']:y=text(x,y,'[ ] '+item,font=10,leading=14)
c.setFillColor(INK);c.setFont('Helvetica',9);c.drawString(M,40,'Cuaderno: albertohdezakkari.github.io/typeorm-portal-2si-2sid/  ·  Selecciona Arturo y abre Ampliación N:M')
end();c.save()
shutil.copyfile(O,N/'fichas-nm-ch22.pdf')
print(O)
