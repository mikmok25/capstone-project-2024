import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TheatreForm from "./TheatreForm";
import {
  deleteTheatre,
  GetAllTheatres,
  GetAllTheatresByOwner,
} from "../../apicalls/theatres";
import { message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import Shows from "./Shows";

function TheatresList() {
  const { user } = useSelector((state) => state.users);
  const [showTheatreFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres = [], setTheatres] = useState([]);
  const [openShowsModal = false, setOpenShowsModal] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByOwner({ owner: user._id });

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

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteTheatre({ theatreId: id });
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
        if(text) {
          return (<span className="text-success">Approved</span>)
        } else {
          return (<span className="text-warning">Pending</span>)
        }
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-1">
            <i
              className="ri-pencil-line text-info cursor-pointer"
              onClick={() => {
                setSelectedTheatre(record);
                setFormType("edit");
                setShowTheatreFormModal(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-line text-error cursor-pointer"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>

           {record.isActive && <span 
           className="underline cursor-pointer"
           onClick={() => {
            setOpenShowsModal(true)
            setSelectedTheatre(record)
          }}
           
           >Shows</span>}
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
      <div className="flex justify-end">
        <Button
          variant="outlined"
          title="Add Theatre"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={theatres} className="mt-2" />

      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {openShowsModal && <Shows
      openShowsModal={openShowsModal}
      setOpenShowsModal={setOpenShowsModal}
      theatre={selectedTheatre}
      />}
    </div>
  );
}

export default TheatresList;
