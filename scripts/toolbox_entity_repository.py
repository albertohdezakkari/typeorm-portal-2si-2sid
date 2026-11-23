"""Acceso uniforme oficial de Toolbox; reutilizado por ambos generadores."""
import re,textwrap

def entity_repository(text):
 """Normaliza los ejemplos originales a la acción oficial EntityRepository v2."""
 pattern=re.compile(r'(MODELO_\w+|TABLA_\w+)\.build\((GetItemCommand|PutItemCommand|UpdateItemCommand|DeleteItemCommand|QueryCommand|ScanCommand)\)')
 def argument(start):
  level=1;quote=None;escape=False;i=start
  while level:
   ch=text[i]
   if quote:
    if escape:escape=False
    elif ch=='\\':escape=True
    elif ch==quote:quote=None
   elif ch in "\"'`":quote=ch
   elif ch=='(':level+=1
   elif ch==')':level-=1
   i+=1
  return text[start:i-1],i
 matches=[]
 for match in pattern.finditer(text):
  pos=match.end();methods={}
  while True:
   call=re.match(r'\s*\.(\w+)\(',text[pos:])
   if not call:break
   body,pos=argument(pos+call.end());methods[call[1]]=body.strip()
   if call[1]=='send':break
  assert 'send' in methods,match.group()
  model=methods.get('entities',match[1]);command=match[2]
  operation={'GetItemCommand':'get','PutItemCommand':'put','UpdateItemCommand':'update','DeleteItemCommand':'delete','QueryCommand':'query','ScanCommand':'scan'}[command]
  first=methods.get('key',methods.get('item',methods.get('query')))
  args=([first] if first else [])+([methods['options']] if 'options' in methods else [])
  def tidy(value):
   lines=value.splitlines()
   if len(lines)>1 and lines[0]=='{' and lines[-1].strip()=='}':
    return '{\n'+textwrap.indent(textwrap.dedent('\n'.join(lines[1:-1])), '  ')+'\n}'
   return value
  formatted=',\n'.join('    '+tidy(line).replace('\n','\n    ') for line in args)
  replacement=model+'.build(EntityRepository).'+operation+'('+('\n'+formatted+'\n  ' if args else '')+')'
  matches.append((match.start(),pos,replacement))
 for start,end,value in reversed(matches):text=text[:start]+value+text[end:]
 if matches:
  text=re.sub(r"import \{[^}]+\} from 'dynamodb-toolbox/(?:entity|table)/actions/(?:get|put|update|delete|query|scan)';\n",'',text)
  def keep_models(match):
   names=[name.strip() for name in match[1].split(',') if not name.strip().startswith('TABLA_')]
   return 'import { '+', '.join(names)+' }'+match[2]
  text=re.sub(r"import \{([^}]+)\}( from '[^']+model.mjs';)",keep_models,text)
  text="import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';\n"+text
 return text

