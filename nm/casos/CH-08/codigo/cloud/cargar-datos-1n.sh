#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PANADERIAS_${TALLER_EQUIPO}\" VALUE {'PANADERIA_ID':1,'NOMBRE':'Panadería Espiga'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PANADERIAS_${TALLER_EQUIPO}\" VALUE {'PANADERIA_ID':2,'NOMBRE':'Panadería Trigo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PRODUCTOS_${TALLER_EQUIPO}\" VALUE {'PRODUCTO_ID':7,'NOMBRE':'Pan integral','PRECIO_CENTIMOS':830,'PANADERIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PRODUCTOS_${TALLER_EQUIPO}\" VALUE {'PRODUCTO_ID':8,'NOMBRE':'Caja de pastas','PRECIO_CENTIMOS':650,'PANADERIA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PRODUCTOS_${TALLER_EQUIPO}\" VALUE {'PRODUCTO_ID':9,'NOMBRE':'Pan integral · nuevo','PRECIO_CENTIMOS':1010,'PANADERIA_ID':1}"
