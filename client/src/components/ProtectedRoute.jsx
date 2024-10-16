import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { Hideloading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(Hideloading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(SetUser(null));
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex items-center justify-between p-2 items-center">
          <div>
            <h1 className="text-2xl text-white cursor-pointer" onClick={() => navigate("/")}>MOVIEMATE</h1>
          </div>

          <div className="bg-white p-1 flex  gap-1 items-center">
            <i class="ri-shield-user-line text-2xl text-primary"></i>
            <h1 className="text-sm underline cursor-pointer"
            onClick={() => {
              if(user.isAdmin) {
                navigate("/admin");
              } else {
                navigate("/profile");
              }
            }}
            >{user.name}</h1>
            <i
              class="ri-logout-box-r-line text-2xl text-primary ml-2 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-2 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
