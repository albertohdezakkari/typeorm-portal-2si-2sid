#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"VENDEDORES_${TALLER_EQUIPO}\" VALUE {'VENDEDOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"VENDEDORES_${TALLER_EQUIPO}\" VALUE {'VENDEDOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':7,'VENDEDOR_ID':1,'ROL':'Venta'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':7,'VENDEDOR_ID':2,'ROL':'Asesoramiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ARTICULO_ID':8,'VENDEDOR_ID':1,'ROL':'Coordinación'}"
