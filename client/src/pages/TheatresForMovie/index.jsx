import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { getAllMovies, getMovieById } from "../../apicalls/movies";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

function TheatresForMovie() {
  //  Get date from query string
  const tempDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = React.useState(
    tempDate || moment().format("YYYY-MM-DD")
  );
  const [movie, setMovie] = React.useState([]);
  const [theatres, setTheatres] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getMovieById(params.id);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({
        movie: params.id,
        date: date,
      });

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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTheatres();
  }, [date]);
  return (
    movie && (
      <div>
        {/* Movie Information */}
        <div className="flex justify-between mb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl uppercase">
              {movie.title} ({moment(movie.releaseDate).format("YYYY")})
            </h1>
            <h1 className="text-md">Duration: {movie.duration} mins</h1>

            <h1 className="text-md">
              Release Date: {moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre: {movie.genre}</h1>
            <h1 className="text-md">Language: {movie.language}</h1>
          </div>
          <div>
            <h1 className="text-md">Select Date:</h1>

            <input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>

        <hr />
        {/* Movie Theatres */}
        <div>
          <h1 className="text-xl uppercase mt-1">Theatres</h1>
        </div>
      </div>
    )
  );
}

export default TheatresForMovie;
