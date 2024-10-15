import React, { useEffect } from "react";
import { Col, message, Row, Table } from "antd";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { getAllMovies, getMovieById } from "../../apicalls/movies";
import moment from "moment";
import {useNavigate, useParams} from "react-router-dom";

function TheatresForMovie() {
  const [movie, setMovie] = React.useState(null);
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

  useEffect(() => {
    getData();
  }, []);
  return movie && <div>
    {/* Movie Information */}
    <div>

    </div>

    <div>

    </div>
  </div>;
}

export default TheatresForMovie;
