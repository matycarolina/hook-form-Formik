import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

export const FormHook = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };
  return (
    <Fragment>
      <h1>Form Hook</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="titulo"
          className="form-control my-2"
          {...register("titulo", { required: true })}
        />
        {/* <span className="text-danger text-small d-block mb-2">
          {errors?.titulo?.message}
        </span> */}
        {errors?.titulo && <span>This field is required</span>}
        <button className="btn btn-primary">Enviar</button>
      </form>
    </Fragment>
  );
};
