import React, {Fragment} from "react";
import { Field } from "formik";

export const ScheduleForm = () => {
  return (
    <>
      <h2>Escoja su horario</h2>

      <label htmlFor="startDate">Fecha de Entrada</label>
      <Field type="date" id="startDate" name="startDate" />

      <label htmlFor="endDate">Fecha de Salida</label>
      <Field type="date" id="endDate" name="endDate" />
    </>
  );
};
