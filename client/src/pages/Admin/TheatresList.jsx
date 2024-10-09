import React, { useEffect, useState } from "react";
import { GetAllTheatres, updateTheatre } from "../../apicalls/theatres";
import { message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";

function TheatresList() {
  const [theatres = [], setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const handleStatusChange = async (theater) => {
    try {
      dispatch(ShowLoading());
      const response = await updateTheatre({
        theatreId: theater._id,
        ...theater,
        isActive: !theater.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return <span className="text-success">Approved</span>;
        } else {
          return <span className="text-warning">Pending</span>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex align-center gap-1">
            {record.isActive && (
              <span
                className="underline cursor-pointer"
                onClick={() => handleStatusChange(record)}
              >
                Block
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline cursor-pointer"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={theatres} className="mt-2" />
    </div>
  );
}

export default TheatresList;
