#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ANALISTAS_${TALLER_EQUIPO}\" VALUE {'ANALISTA_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ANALISTAS_${TALLER_EQUIPO}\" VALUE {'ANALISTA_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':7,'ANALISTA_ID':1,'ROL':'Análisis'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':7,'ANALISTA_ID':2,'ROL':'Verificación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':8,'ANALISTA_ID':1,'ROL':'Coordinación'}"
