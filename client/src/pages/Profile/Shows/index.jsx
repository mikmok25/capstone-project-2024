import { Modal, Table } from "antd";
import React, { useState } from "react";
import Button from "../../../components/Button";

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = useState("table");
  const [shows, setShows] = useState([]);
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",

    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    }
  ]
  return (
    <Modal
      title=""
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-primary text-md uppercase mb-1">
        Theatre : {theatre.name}
      </h1>
      <hr />

      <div className="flex justify-between align-center mt-2">
        <h1 className="text-md uppercase">
          {view === "table" ? "Show List" : "Add Show"}
        </h1>
        <Button
          variant="outlined"
          title="Add Show"
          onClick={() => {
            setView("form");
          }}
        />
      </div>

      {view === "table" && (
        <Table columns={columns} dataSource={shows} className="mt-2" />
      )}
    </Modal>
  );
}

export default Shows;
