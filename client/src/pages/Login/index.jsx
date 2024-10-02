import React, { useEffect } from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { Hideloading, ShowLoading } from "../../redux/loadersSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(Hideloading());

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(Hideloading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="card p-3 w-400">
        <h3 className="text-xl pb-1">MICKMOVIES - LOGIN</h3>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col gap-1 mt-2">
            <Button
              fullWidth
              title="LOGIN"
              type="submit"
              variant="outlined"
            ></Button>
            <Link className="text-center text-primary" to="/register">
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
