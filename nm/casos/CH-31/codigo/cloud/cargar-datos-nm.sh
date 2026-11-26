#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REVISORES_${TALLER_EQUIPO}\" VALUE {'REVISOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"REVISORES_${TALLER_EQUIPO}\" VALUE {'REVISOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':7,'REVISOR_ID':1,'ROL':'Catalogación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':7,'REVISOR_ID':2,'ROL':'Verificación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'DOCUMENTO_ID':8,'REVISOR_ID':1,'ROL':'Coordinación'}"
