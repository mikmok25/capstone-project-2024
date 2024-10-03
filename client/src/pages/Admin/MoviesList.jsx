import React, { useEffect } from "react";
import Button from "../../components/Button";
import MovieForm from "./MovieForm";
import moment from "moment";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { getMovies } from "../../apicalls/movies";

function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await getMovies();

      if (response.success) { 
        setMovies(response.data);
      }else {
        message.error(response.message);
      }
      dispatch(Hideloading())
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description", 
    },
    {
      title: "Duration",
      dataIndex: "duration", 
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY"); 
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => { 
        return <div className="flex align-center gap-1">
          <i className="ri-pencil-line text-info"></i>
          <i className="ri-delete-bin-line text-error"></i>
        </div>
      }
    }
  ]

  useEffect(() => { 
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Movie"
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
        />
      </div>


      <Table columns={columns} dataSource={movies} />
      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
        />
      )}
    </div>
  );
}

export default MoviesList;
