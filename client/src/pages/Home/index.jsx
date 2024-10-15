import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { getAllMovies } from "../../apicalls/movies";
import moment from "moment";
import {useNavigate} from "react-router-dom";

function Home() {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response.data);
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
  return (
    <div>
      <input type="text" placeholder="Search Movies" className="search-input" />

      <Row gutter={[16, 16]} className="mt-2">
        {movies.map((movie) => (
          <Col span={6} key={movie._id}>
            <div
              className="card flex-col gap-1 cursor-pointer"
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <img
                src={movie.poster}
                alt="Movie Poster1"
                height={200}
                style={{ width: "100%" }}
              />

              <div className="flex justify-between p-1">
                <h1 className="text-md uppercase">{movie.title}</h1>
                <span>
                  {moment(movie.releaseDate).format("MMM. DD,  YYYY")}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
