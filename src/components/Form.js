import React, { Fragment, useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    userName: "",
    userLast: "",
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setData({
      ...data, //crear copia del estado
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar procesamiento automatico
    console.log(data.userName + " " + data.userLast);
  };

  return (
    <Fragment>
      <h1>Formulario</h1>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            placeholder="Ingrese nombre"
            className="form-control"
            type="text"
            name="userName" //primer paso para relacionar input con el atributo
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <input
            placeholder="Ingrese apellido"
            className="form-control"
            type="text"
            name="userLast"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </div>
      </form>
      <h3>
        {data.userName} - {data.userLast}
      </h3>
    </Fragment>
  );
};

export default Form;
