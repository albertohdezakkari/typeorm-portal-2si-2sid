#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AGRICULTORES_${TALLER_EQUIPO}\" VALUE {'AGRICULTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"AGRICULTORES_${TALLER_EQUIPO}\" VALUE {'AGRICULTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':7,'AGRICULTOR_ID':1,'ROL':'Recolección'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':7,'AGRICULTOR_ID':2,'ROL':'Clasificación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':8,'AGRICULTOR_ID':1,'ROL':'Coordinación'}"
