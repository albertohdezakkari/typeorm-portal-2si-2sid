#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INSPECTORES_${TALLER_EQUIPO}\" VALUE {'INSPECTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"INSPECTORES_${TALLER_EQUIPO}\" VALUE {'INSPECTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':7,'INSPECTOR_ID':1,'ROL':'Control de calidad'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':7,'INSPECTOR_ID':2,'ROL':'Trazabilidad'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':8,'INSPECTOR_ID':1,'ROL':'Coordinación'}"
