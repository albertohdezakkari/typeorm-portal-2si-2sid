#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARCHIVOS_${TALLER_EQUIPO}\" VALUE {'ARCHIVO_ID':1,'NOMBRE':'Archivo Municipal'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARCHIVOS_${TALLER_EQUIPO}\" VALUE {'ARCHIVO_ID':2,'NOMBRE':'Archivo del Centro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"DOCUMENTOS_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':7,'NOMBRE':'Inventario antiguo','PAGINAS':95,'ARCHIVO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"DOCUMENTOS_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':8,'NOMBRE':'Memoria del barrio','PAGINAS':75,'ARCHIVO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"DOCUMENTOS_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':9,'NOMBRE':'Inventario antiguo · nuevo','PAGINAS':115,'ARCHIVO_ID':1}"
