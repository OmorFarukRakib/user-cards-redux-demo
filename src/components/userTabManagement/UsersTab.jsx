import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MetaDecorator } from "../../components/metaDecorator/MetaDecorator";
import { fetchAdminUsers, fetchEmployeeUsers } from "../../redux";
import AddUserModal from "../addUserModal/AddUserModal";
import { UsersList } from "./UsersList";
import "./userTabManagement.css";

function UsersTab() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const adminUserList = useSelector((state) => state.adminUsers);
  const employeeUserList = useSelector((state) => state.employeeUsers);
  const { pathname } = useLocation();
  const [usersListData, setUsersListData] = useState({
    users: [],
    loading: true,
    error: "",
  });
  const dispatch = useDispatch();

  const userType = pathname.includes("/admin") === true ? "admin" : "employee";

  useEffect(() => {
    if (userType === "admin") {
      if (adminUserList.fetchedOnce === false) {
        dispatch(fetchAdminUsers());
      } else {
        setUsersListData({
          users: adminUserList.users,
          loading: adminUserList.loading,
          error: adminUserList.error,
        });
      }
    } else if (userType === "employee") {
      if (employeeUserList.fetchedOnce === false) {
        dispatch(fetchEmployeeUsers());
      } else {
        setUsersListData({
          users: employeeUserList.users,
          loading: employeeUserList.loading,
          error: employeeUserList.error,
        });
      }
    }
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    if (userType === "admin") {
      setUsersListData({
        users: adminUserList.users,
        loading: adminUserList.loading,
        error: adminUserList.error,
      });
    } else if (userType === "employee") {
      setUsersListData({
        users: employeeUserList.users,
        loading: employeeUserList.loading,
        error: employeeUserList.error,
      });
    }
    // eslint-disable-next-line
  }, [adminUserList, employeeUserList]);

  return usersListData.loading ? (
    <h2>Loading</h2>
  ) : usersListData.error ? (
    <h2>{usersListData.error}</h2>
  ) : (
    <>
      <MetaDecorator title={`${userType.toUpperCase()}`} />

      <div className="user-tab-wrapper">
        {userType === "admin" && <h1>Admin Users List</h1>}
        {userType === "employee" && <h1>Employee Users List</h1>}

        <button className="add-user-btn" onClick={() => setOpenAddModal(true)}>
          <AiOutlineUserAdd />
          &nbsp;Add User
        </button>
        <div className="user-list-wrapper">
          {usersListData &&
            usersListData.users &&
            usersListData.users.map((user) => (
              <UsersList user={user} key={user.id} />
            ))}
        </div>
        {openAddModal && <AddUserModal closeModal={setOpenAddModal} />}
      </div>
    </>
  );
}

export default UsersTab;
