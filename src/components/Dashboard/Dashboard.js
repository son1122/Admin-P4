import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
const Dashboard = (props) => {
  const [data, setData] = useState([
    {
      type: "Test",
      value: 27,
    },
  ]);
  const [menuItem, setMenuitem] = useState(
    <option value="loading">Loading</option>
  );
  const navigate = useNavigate();
  const [select, setSelect] = useState();
  const [list, setList] = useState();
  const [formData, setFormData] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="customer-db-cont">
      <div className="customer-db-buttons">
        <p
          onClick={() => {
            localStorage.removeItem("jwt");
            navigate("/login");
          }}
        >
          LOGOUT
        </p>
        <p onClick={() => navigate("/profile")}>PROFILE</p>
      </div>
      <div className="customer-db-first">
        <h1 className="db-header">
          Admin DashBoard
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
