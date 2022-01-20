import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./App.css";
import "./App-custom.css";
import { ScheduleForm } from "./components/ScheduleForm";
import { DaysOffForm } from "./components/DaysOffForm";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Ejemplo con Formik</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          selectedSchedule: false, // added for our checkbox
          jobType: "", // added for our select
          startDate: "",
          endDate: "",
          datesOff: [
            /* { id: "1", date: "2022-01-18" },
            { id: "2", date: "2022-01-20" },
            { id: "3", date: "2022-01-22" }, */
          ],
          
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Debe contener 15 caracteres o menos")
            .required("Requerido"),
          lastName: Yup.string()
            .max(20, "Debe contener 20 caracteres o menos")
            .required("Requerido"),
          email: Yup.string()
            .email("Direccion de email invalida")
            .required("Requerido"),
          selectedSchedule: Yup.boolean(),
          /* .required("Required")
            .oneOf([true], "You must accept the terms and conditions.") */
          jobType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["disenador", "desarrollo", "producto", "otro"],
              "Tipo de empleo invalido"
            )
            .required("Requerido"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);

          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <MyTextInput
              label="Nombre"
              name="firstName"
              type="text"
              placeholder="Jane"
            />
            <MyTextInput
              label="Apellido"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <MySelect label="Tipo de Empleo" name="jobType">
              <option value="">Seleccione un tipo de empleo</option>
              <option value="disenador">Disenador</option>
              <option value="desarrollo">Developer</option>
              <option value="producto">Manager de Producto</option>
              <option value="otro">Otro</option>
            </MySelect>
            <MyCheckbox name="selectedSchedule">
              Elegir mi propio horario
            </MyCheckbox>
            {values.selectedSchedule && <ScheduleForm />}

            <button
              type="button"
              className="mt-5"
              onClick={() => {
                const newFreeDay = {
                  id: Date.now().toString(), //crear id unico basado en la fecha
                  date: "",
                };
                const newDaysOff = values.datesOff;
                newDaysOff.push(newFreeDay);
                setFieldValue("datesOff", newDaysOff);
              }}
            >
              Agregar dias de descanso
            </button>

            {values.datesOff.map((items, index) => (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const daysOff = values.datesOff;
                    const removeDayOff = daysOff.filter((day)=> day.id !== items.id);
                    setFieldValue("datesOff", removeDayOff);
                  }}
                >
                  Eliminar
                </button>
                <DaysOffForm data={items} key={items.id} index={index} />
              </>
            ))}

            <button type="submit" className="mt-5">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export function AppForm() {
  return <SignupForm />;
}
