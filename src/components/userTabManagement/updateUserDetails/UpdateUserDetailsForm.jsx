import axios from "axios";
import { State } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAdminUser,
  deleteEmployeeUser,
  updateAdminUser,
  updateEmployeeUser,
} from "../../../redux";
import "./updateUserDetails.css";

export const UpdateUserDetailsForm = ({ userData }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  const options = State.getStatesOfCountry("BD");

  const initialValues = {
    firstName: userData[0].first_name,
    lastName: userData[0].last_name,
    userType: userData[0].user_type,
    division: userData[0].division,
    district: userData[0].district,
    id: userData[0].id,
  };

  const onSubmit = async (values) => {
    if (values.userType === "admin") {
      var userDivision = initialValues.division;
      var userDistrict = initialValues.district;
    } else if (values.userType === "employee") {
      userDivision = values.division;
      userDistrict = values.district;
    }

    const updatedUser = {
      first_name: values.firstName,
      last_name: values.lastName,
      user_type: values.userType,
      division: userDivision,
      district: userDistrict,
      id: values.id,
    };
    axios
      .put(
        `https://60f2479f6d44f300177885e6.mockapi.io/users/${updatedUser.id}`,
        {
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          user_type: updatedUser.user_type,
          division: updatedUser.division,
          district: updatedUser.district,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (updatedUser.user_type === "admin") {
            dispatch(updateAdminUser(updatedUser));
            dispatch(deleteEmployeeUser(updatedUser.id));
            navigate(`/admin/${updatedUser.id}`);
          } else if (updatedUser.user_type === "employee") {
            dispatch(updateEmployeeUser(updatedUser));
            dispatch(deleteAdminUser(updatedUser.id));
            navigate(`/employee/${updatedUser.id}`);
          }
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
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Field>
                <span className="error">
                  <ErrorMessage name="userType" />
                </span>
              </div>

              {formik.values.userType === "employee" ? (
                <>
                  <div className="form-control">
                    <label htmlFor="division">Division</label>
                    <Field
                      as="select"
                      id="division"
                      name="division"
                      className="select"
                    >
                      <option
                        value={userData[0].division ? userData[0].division : ""}
                      >
                        {userData[0].division
                          ? userData[0].division
                          : "Select A Division"}
                      </option>
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
                      <option
                        value={userData[0].district ? userData[0].district : ""}
                      >
                        {userData[0].district
                          ? userData[0].district
                          : "Select A District"}
                      </option>
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
                </>
              ) : null}

              <button type="submit" disabled={!isValid} className="submit-btn">
                UPDATE
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
