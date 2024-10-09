import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";

function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.Tabpane tab="Bookings" key="1">
          Bookings
        </Tabs.Tabpane>
        <Tabs.Tabpane tab="Theatres" key="2">
          <TheatresList />
        </Tabs.Tabpane>
      </Tabs> 
    </div>
  );
}

export default Profile;
