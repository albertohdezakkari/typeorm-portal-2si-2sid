#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EDITORIALES_${TALLER_EQUIPO}\" VALUE {'EDITORIAL_ID':1,'NOMBRE':'Editorial Roble'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EDITORIALES_${TALLER_EQUIPO}\" VALUE {'EDITORIAL_ID':2,'NOMBRE':'Editorial Faro'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PUBLICACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':7,'NOMBRE':'Rutas del Ebro','PAGINAS':320,'EDITORIAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PUBLICACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':8,'NOMBRE':'Historias cortas','PAGINAS':240,'EDITORIAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PUBLICACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':9,'NOMBRE':'Rutas del Ebro · nuevo','PAGINAS':400,'EDITORIAL_ID':1}"
