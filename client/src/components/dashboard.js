import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Spin,
  Alert,
  Row,
  Col,
  Space,
  Avatar,
  Typography,
  Input,
} from "antd";
import "./dashboard.css";
import { UserOutlined } from "@ant-design/icons";
const { Search } = Input;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [tableState, setTableState] = useState({ filterInfo: {} });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
        setFilteredUsers(userList); // Initialize filteredUsers with userList
      } catch (error) {
        setError(error.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleLogoutConfirmation = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const roles = users
    .map(user => user.role)
    .filter((value, index, self) => self.indexOf(value) === index); // Unique roles

  const columns = [
    {
      title: "S.No",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: roles.map(role => ({
        text: role,
        value: role,
      })),
      filteredValue: tableState.filterInfo["role"] || null,
      onFilter: (value, record) => record.role.includes(value),
      filterSearch: true,
    },
  ];

  if (loading)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  if (error) return <Alert message="Error" description={error} type="error" />;

  const handleSearch = (e) => {
    const value = e.target.value;
    if (!value) {
      setFilteredUsers(users);
    } else {
      const normalizedValue = value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(normalizedValue) ||
          user.lastName.toLowerCase().includes(normalizedValue) ||
          user.email.toLowerCase().includes(normalizedValue) ||
          user.mobileNumber.toLowerCase().includes(normalizedValue) ||
          user.role.toLowerCase().includes(normalizedValue)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <section className="dashboard">
      <Row>
        <Col span={24} className="header">
          <Space>
            <Button onClick={handleLogoutConfirmation}>Logout</Button>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="UserOutlined"
            />
          </Space>
        </Col>
        <Col span={24} className="heading">
          <Typography className="title">Users List</Typography>
        </Col>
        <Col span={23} className="selectSearchCol" align="end">
          <Search
            placeholder="Search users..."
            onChange={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
        </Col>
        <Col span={24} className="table">
          <Table
            dataSource={filteredUsers} 
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            onChange={(pagination, filters) => {
              setTableState({ filterInfo: filters });
            }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;
