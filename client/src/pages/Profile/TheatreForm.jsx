import { Form, message, Modal } from "antd";
import React from "react";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
}) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
      } else {
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      } else {
        message.error(response.message);
      }

      dispatch(Hideloading());
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Please enter theatre name" }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Theatre Address"
          name="address"
          rules={[{ required: true, message: "Please enter theatre address" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter theatre phone number",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter theatre email address",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>

        <div className="flex justify-end gap-1">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          ></Button>
          <Button title="Save" type="submit"></Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;
