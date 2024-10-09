import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";
import { addMovie, deleteMovie, updateMovie } from "../../apicalls/movies";
import moment from "moment";
function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  formType,
  getData,
  setFormType,

}) {
  if (selectedMovie)
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (formType === "add") {
        response = await addMovie(values);
      } else {
        response = await updateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
        setSelectedMovie(null);

      } else {
        message.error(response.message);
      }
      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteMovie({ movieId });
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
  }
  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : formType === "edit" ? "EDIT MOVIE" : "DELETE MOVIE"} // Change title dynamically
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      {formType === "delete" ? (
        <div>
          <p>Are you sure you want to delete this movie?</p>
          <div className="flex justify-end gap-1">
            <Button
              title="No"
              variant="outlined"
              type="button"
              onClick={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
              }}
            />
            <Button title="Yes" onClick={handleDelete} />
          </div>
        </div>
      ) : (
        <Form layout="vertical" onFinish={onFinish} initialValues={selectedMovie}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Movie Name" name="title">
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Movie Description" name="description">
                <textarea type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Language" name="language">
                <select>
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">Chinese</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Duration" name="duration">
                <input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Release Date" name="releaseDate">
                <input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Genre" name="genre">
                <select>
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Poster URL" name="poster">
                <input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-1">
            <Button
              title="Cancel"
              variant="outlined"
              type="button"
              onClick={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
              }}
            />
            <Button title="Save" type="submit" />
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default MovieForm;
