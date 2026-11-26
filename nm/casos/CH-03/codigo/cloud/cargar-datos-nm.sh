#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"RESTAURADORES_${TALLER_EQUIPO}\" VALUE {'RESTAURADOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"RESTAURADORES_${TALLER_EQUIPO}\" VALUE {'RESTAURADOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':7,'RESTAURADOR_ID':1,'ROL':'Conservación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':7,'RESTAURADOR_ID':2,'ROL':'Documentación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PIEZA_ID':8,'RESTAURADOR_ID':1,'ROL':'Coordinación'}"
