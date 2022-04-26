import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton } from "react-share";
import userImg from "../../assets/user.png";
import { fetchIndividualUser } from "../../commonHandler/fetchSingleUserData";
import { MetaDecorator } from "../metaDecorator/MetaDecorator";

export const UserDetails = () => {
  const navigate = useNavigate();
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
            url={`${window.location.origin}/${window.location.pathname}`}
          />
          <div className="user-detail-card-wrapper">
            <div className="user-detail-card solo-details-tab">
              <img src={userImg} alt="user-logo" />
              <p className="user-data-title-head">User Information</p>
              <FacebookShareButton
                url={`${window.location.origin}/${window.location.pathname}`}
              >
                <FacebookIcon round={true} size={30} />
              </FacebookShareButton>
              <div className="user-data-wrapper">
                <p>
                  <span className="user-data-title">First Name: </span>
                  <span>{userData[0].first_name}</span>
                </p>
                <p>
                  <span className="user-data-title">Last Name: </span>
                  <span>{userData[0].last_name}</span>
                </p>
                <p>
                  <span className="user-data-title">User Type: </span>
                  <span>{userData[0].user_type}</span>
                </p>
                <p>
                  <span className="user-data-title">Division: </span>
                  <span>{userData[0].division}</span>
                </p>
                <p>
                  <span className="user-data-title">District: </span>
                  <span>{userData[0].district}</span>
                </p>
              </div>
              <button
                onClick={() => navigate(`./update`)}
                className="update-user-btn"
              >
                {/* Edit */}
                <FaRegEdit />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
