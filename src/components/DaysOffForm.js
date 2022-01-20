import React, { Fragment } from "react";
import { Field } from "formik";

export const DaysOffForm = ({ data, index }) => {
  return (
    <>
      <label htmlFor="date">Descanso N{data.id}</label>
      <Field type="date" name={`datesOff[${index}].date`} />
    </>
  );
};
