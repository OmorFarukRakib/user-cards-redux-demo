import axios from "axios";
import { State } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdminUser, addEmployeeUser } from "../../redux";
import "./addUserModal.css";

export const AddUserForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(true);

  const options = State.getStatesOfCountry("BD");

  const initialValues = {
    firstName: "",
    lastName: "",
    userType: "",
    division: "",
    district: "",
    // id: "",
  };

  const onSubmit = async (values) => {
    axios
      .post("https://60f2479f6d44f300177885e6.mockapi.io/users/", {
        first_name: values.firstName,
        last_name: values.lastName,
        user_type: values.userType,
        division: values.division,
        district: values.district,
      })
      .then((response) => {
        const addedNewUser = response.data;
        if (response.status === 201) {
          if (addedNewUser.user_type === "admin") {
            dispatch(addAdminUser(addedNewUser));
            navigate(`/admin/${addedNewUser.id}`);
          } else if (addedNewUser.user_type === "employee") {
            dispatch(addEmployeeUser(addedNewUser));
            navigate(`/employee/${addedNewUser.id}`);
          }
          closeModal(false);
        }
      })
      .catch((error) => {
        // error.message is the error message
        //dispatch(fetchAdminUsersFailure(error.message))
      });
  };

  const validate = (values) => {
    setIsValid(true);
    const hasNumber = /\d/;
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
      setIsValid(false);
    }
    if (hasNumber.test(values.firstName)) {
      errors.firstName = "Name cannot contain number";
      setIsValid(false);
    }
    if (values.firstName.length > 50) {
      errors.firstName = "Name must be less than 50 characters";
      setIsValid(false);
    }
    if (!values.lastName) {
      errors.lastName = "Required";
      setIsValid(false);
    }
    if (hasNumber.test(values.lastName)) {
      errors.lastName = "Name cannot contain number";
      setIsValid(false);
    }
    if (values.lastName.length > 50) {
      errors.lastName = "Name must be less than 50 characters";
      setIsValid(false);
    }
    if (!values.userType) {
      errors.userType = "Required";
      setIsValid(false);
    }
    if (!values.division) {
      errors.division = "Required";
      setIsValid(false);
    }
    if (!values.district) {
      errors.district = "Required";
      setIsValid(false);
    }

    return errors;
  };

  return (
    <div className="update-wrapper">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => {
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
                <span className="error">
                  <ErrorMessage name="firstName" />
                </span>
              </div>
              <div className="form-control">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
                <span className="error">
                  <ErrorMessage className="error" name="lastName" />
                </span>
              </div>

              <div className="form-control">
                <label htmlFor="userType">User Type</label>
                <Field
                  as="select"
                  id="userType"
                  name="userType"
                  className="select"
                >
                  <option value="">Choose an option</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Field>
                <span className="error">
                  <ErrorMessage name="userType" />
                </span>
              </div>

              <div className="form-control">
                <label htmlFor="division">Division</label>
                <Field
                  as="select"
                  id="division"
                  name="division"
                  className="select"
                >
                  <option value="">Choose an option</option>

                  {options.map((option) => {
                    return (
                      <option key={option.isoCode} value={option.name}>
                        {option.name}
                      </option>
                    );
                  })}
                </Field>
                <span className="error">
                  <ErrorMessage name="division" />
                </span>
              </div>

              <div className="form-control">
                <label htmlFor="district">District</label>
                <Field
                  as="select"
                  id="district"
                  name="district"
                  className="select"
                >
                  <option value="">Choose an option</option>

                  {options.map((option) => {
                    return (
                      <option key={option.isoCode} value={option.name}>
                        {option.name}
                      </option>
                    );
                  })}
                </Field>
                <span className="error">
                  <ErrorMessage name="division" />
                </span>
              </div>

              <button type="submit" disabled={!isValid} className="submit-btn">
                Add User
              </button>
              <button onClick={() => closeModal(false)} className="cancel-btn">
                Cancel
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
