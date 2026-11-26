#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESTACIONES_${TALLER_EQUIPO}\" VALUE {'ESTACION_ID':1,'NOMBRE':'Estación Central'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ESTACIONES_${TALLER_EQUIPO}\" VALUE {'ESTACION_ID':2,'NOMBRE':'Estación Norte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TRAYECTOS_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':7,'NOMBRE':'Ruta del valle','DISTANCIA_KM':215,'ESTACION_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TRAYECTOS_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':8,'NOMBRE':'Ruta de la costa','DISTANCIA_KM':180,'ESTACION_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TRAYECTOS_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':9,'NOMBRE':'Ruta del valle · nuevo','DISTANCIA_KM':250,'ESTACION_ID':1}"
