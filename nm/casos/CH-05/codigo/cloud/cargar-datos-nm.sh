#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARTISTAS_${TALLER_EQUIPO}\" VALUE {'ARTISTA_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ARTISTAS_${TALLER_EQUIPO}\" VALUE {'ARTISTA_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':7,'ARTISTA_ID':1,'ROL':'Interpretación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':7,'ARTISTA_ID':2,'ROL':'Dirección artística'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':8,'ARTISTA_ID':1,'ROL':'Coordinación'}"
