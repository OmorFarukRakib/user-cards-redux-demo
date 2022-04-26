import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchIndividualUser } from "../../../commonHandler/fetchSingleUserData";
import { MetaDecorator } from "../../metaDecorator/MetaDecorator";
import { UpdateUserDetailsForm } from "./UpdateUserDetailsForm";

export const UpdateUserDetails = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const adminUserList = useSelector((state) => state.adminUsers);
  const employeeUserList = useSelector((state) => state.employeeUsers);
  const { userID } = useParams();
  const [userData, setUserData] = useState(null);

  const userType = pathname.includes("/admin/") ? "admin" : "employee";

  useEffect(() => {
    if (userType === "admin") {
      setLoading(true);
      if (adminUserList.fetchedOnce === true) {
        let userDetailsData = adminUserList.users.filter(
          (user) => user.id === userID
        );
        if (userDetailsData.length === 0) {
          setError(true);
        } else {
          setUserData(userDetailsData);
        }
        setLoading(false);
      } else {
        fetchIndividualUser(
          userID,
          userType,
          setError,
          setLoading,
          setUserData
        );
      }
    } else if (userType === "employee") {
      setLoading(true);
      if (employeeUserList.fetchedOnce === true) {
        let userDetailsData = employeeUserList.users.filter(
          (user) => user.id === userID
        );
        if (userDetailsData.length === 0) {
          setError(true);
        } else {
          setUserData(userDetailsData);
        }
        setLoading(false);
      } else {
        fetchIndividualUser(
          userID,
          userType,
          setError,
          setLoading,
          setUserData
        );
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <h2>Loading</h2>}
      {error &&
        (userType === "admin" ? (
          <h2>No Admin with such ID</h2>
        ) : (
          <h2>No Employee with such ID</h2>
        ))}

      {userData && (
        <>
          <MetaDecorator
            title={`${userType.toUpperCase()} | ${userData[0].first_name}`}
          />

          <div>
            <h2>User Update</h2>
            <UpdateUserDetailsForm userData={userData} />
          </div>
        </>
      )}
    </>
  );
};
