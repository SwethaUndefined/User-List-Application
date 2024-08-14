import React from "react";
import { Row,Col, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; 
import "./login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      message.success("Login successful!");
      localStorage.setItem("token", response.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "Please register to continue.") {
        message.error("Please register to continue.");
        navigate("/signup");
      } else if (errorMessage === "Invalid Password") {
        message.error("Invalid Password.");
      } else if (errorMessage === "Token missing or invalid") {
        message.error("Your session has expired. Please log in again.");
        navigate("/login"); 
      } else {
        message.error(errorMessage || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  const handleRegisterClick = () => {
    navigate("/signup"); 
  };

  return (
    <section className="container">
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} className="loginform">
            <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                className="login__input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                className="login__input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="login__submit"
                type="primary" ghost
              >
                Login
              </Button>
            </Form.Item>
            <span>Don't have an account?</span>
            <Button type="link" onClick={handleRegisterClick} className="register-btn">
              Register
            </Button>
          </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
