#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AUTORES_${TALLER_EQUIPO}\" VALUE {'AUTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AUTORES_${TALLER_EQUIPO}\" VALUE {'AUTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':7,'AUTOR_ID':1,'ROL':'Redacción'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':7,'AUTOR_ID':2,'ROL':'Revisión'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PUBLICACION_ID':8,'AUTOR_ID':1,'ROL':'Coordinación'}"
