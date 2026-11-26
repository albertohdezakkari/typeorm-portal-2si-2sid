#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GUIAS_${TALLER_EQUIPO}\" VALUE {'GUIA_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GUIAS_${TALLER_EQUIPO}\" VALUE {'GUIA_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':7,'GUIA_ID':1,'ROL':'Guía de ruta'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':7,'GUIA_ID':2,'ROL':'Apoyo logístico'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EXCURSION_ID':8,'GUIA_ID':1,'ROL':'Coordinación'}"
