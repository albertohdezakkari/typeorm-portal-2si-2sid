#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CULTIVADORES_${TALLER_EQUIPO}\" VALUE {'CULTIVADOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CULTIVADORES_${TALLER_EQUIPO}\" VALUE {'CULTIVADOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':7,'CULTIVADOR_ID':1,'ROL':'Siembra'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':7,'CULTIVADOR_ID':2,'ROL':'Riego'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':8,'CULTIVADOR_ID':1,'ROL':'Coordinación'}"
