#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INTERPRETES_${TALLER_EQUIPO}\" VALUE {'INTERPRETE_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INTERPRETES_${TALLER_EQUIPO}\" VALUE {'INTERPRETE_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':7,'INTERPRETE_ID':1,'ROL':'Interpretación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':7,'INTERPRETE_ID':2,'ROL':'Narración'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'FUNCION_ID':8,'INTERPRETE_ID':1,'ROL':'Coordinación'}"
