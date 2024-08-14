import React from "react";
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import { signup } from "../api";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./signup.css";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const SignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signup(values);
      message.success("Signup successful!");
      setTimeout(()=>{
      navigate('/dashboard')
      },2000)
    } catch (error) {
      message.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const validatePassword = (password) => {
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least 1 lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least 1 uppercase letter.";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least 1 number.";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password must contain at least 1 special character.";
    }
    if (password.length < 7) {
      return "Password must be at least 7 characters long.";
    }
    return null; 
  };
  return (
    <section className="container">
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} className="registerform">
              <Form
                name="signup"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                className="register-form"
              >
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="First Name"
                    className="register__input"
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your Last Name!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Last Name"
                    className="register__input"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    className="register__input"
                  />
                </Form.Item>
                <Form.Item
                  name="mobileNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile Number!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    placeholder="Mobile Number"
                    className="register__input"
                  />
                </Form.Item>
                <Form.Item
                  name="role"
                  rules={[
                    { required: true, message: "Please select your Role!" },
                  ]}
                >
                  <Select placeholder="Select Role" className="login__input">
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="guest">Guest</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: (_, value) => {
                        const errorMessage = validatePassword(value);
                        if (errorMessage) {
                          return Promise.reject(errorMessage);
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    className="login__input"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    loading={loading}
                    className="register__submit"
                    type="primary"
                    ghost
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                <span>Want to Login?</span>
                <Button
                  type="link"
                  onClick={handleLoginClick}
                  className="login-btn"
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default SignUp;
