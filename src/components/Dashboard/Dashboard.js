import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
const Dashboard = (props) => {

  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [list, setList] = useState();
    const [listCar, setListCar] = useState();
  const [formData, setFormData] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
    const [numInsure,setNumInsure]=useState(0)
    const [paidInsure,setPaidInsure]=useState(0)
    const [claimInsure,setClaimInsure]=useState(0)
    const [claimNum,setClaimNum]=useState(0)
    const [carNum,setCarNum]=useState(0)

    const[addCarBrand,setAddCarBrand]=useState("aa")
    const[addCarYear,setAddCarYear]=useState("")
    const[addCarModel,setAddCarModel]=useState("")
    const[addCarType1,setAddCarType1]=useState("")
    const[addCarType2,setAddCarType2]=useState("")
    const[addCarType3,setAddCarType3]=useState('')

    const[editId,setEditId]=useState(0)
    const[editCarBrand,seteditCarBrand]=useState("")
    const[editCarYear,seteditCarYear]=useState("")
    const[editCarModel,seteditCarModel]=useState("")
    const[editCarType1,seteditCarType1]=useState("")
    const[editCarType2,seteditCarType2]=useState("")
    const[editCarType3,seteditCarType3]=useState("")

    const[claim,setClaim]=useState()
    const[claimId,setClaimId]=useState()
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    const addCar =()=>{
        axios.post("http://localhost:3010/admin/addcar/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
                brand:addCarBrand,
                model:addCarModel,
                year:addCarYear,
                type1:addCarType1,
                type2:addCarType2,
                type3:addCarType3,
            })
            .then((resu) => {

            })
    }
    const editCar =()=>{
        axios.post("http://localhost:3010/admin/insure/", {
            headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            brand:editCarBrand,
            model:editCarModel,
            year:editCarYear,
            type1:editCarType1,
            type2:editCarType2,
            type3:editCarType3,
        })
            .then((resu) => {

            })
    }
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/admin/getcarmodel/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                setCarNum(resu.data.length.toLocaleString())
                let data = resu.data.map((name, index) => {
                    console.log(name);
                    return (
                        <div className="customer-db-third-customerorders-detail-cont-2" style={{gridTemplateColumns:"1fr 1fr 1fr 1fr",width:"80vw"}}>
                            <div className="customer-db-third-customerorders-detail">
                                {name.id}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.year}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.brand}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.model}
                            </div>
                        </div>
                    );
                });
                setListCar(data)
            })
    },[])
    useEffect(()=>{
        console.log(editId)
        axios.post("http://localhost:3010/admin/geteditinsure",{
            id:editId
        }).then(a=>{
            console.log(a)
            seteditCarType1(a.data[0].price)
            seteditCarType2(a.data[1].price)
            seteditCarType3(a.data[2].price)
            seteditCarYear(a.data[0].CarModel.year)
            seteditCarBrand(a.data[0].CarModel.brand)
            seteditCarModel(a.data[0].CarModel.model)
        })
    },[editId])
    useEffect(()=>{},[editCarBrand])
    useEffect(() => {
        const select = axios
            .get("http://localhost:3010/admin/dashboarddata/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                console.log(resu);
                let price=0
                setNumInsure(resu.data.length.toLocaleString())
                let data = resu.data.map((name, index) => {
                    console.log(name);
                    price=price+name.priceFinal
                    return (
                        <div className="customer-db-third-customerorders-detail-cont-2">
                            <div className="customer-db-third-customerorders-detail">
                                {name.customerId}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.insuranceType}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.priceFinal.toLocaleString()}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.plate}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.province}
                            </div>
                            <div className="customer-db-third-customerorders-detail">
                                {name.endDate}
                            </div>
                        </div>
                    );
                });
                setList(data)
                setPaidInsure(price.toLocaleString())
            });
        let claimCost=0
        const claim = axios
            .get("http://localhost:3010/admin/claim/", {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
            })
            .then((resu) => {
                resu.data.forEach(i=>{
                    console.log(i.priceClaim)
                    claimCost=claimCost+i.priceClaim
                })
                setClaimInsure(claimCost.toLocaleString())
                setClaimNum(resu.data.length)
            })
    }, [])
  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="" style={{backgroundColor:"rgb(15,14,159)"}}>
      <div style={{textAlign:"left",display:"flex",justifyContent:"space-around",color:"white"}}>
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
      <h1 style={{color:"white"}}>ADMIN Portal</h1>
      <div className={"admin-body"}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",margin:"3% 7% 3% 7%"}}>
            <button style={{backgroundColor:"white"}} onClick={()=>setSelect(0)}>DashBoard</button>
            <button style={{backgroundColor:"white"}} onClick={()=>setSelect(1)}>Add Car</button>
            <button style={{backgroundColor:"white"}} onClick={()=>setSelect(2)}>Edit Insurance</button>
            <button style={{backgroundColor:"white"}} onClick={()=>setSelect(3)}>Claim</button>
        </div>
          <div>
              {select==0?<div>
                  <div className={"scroll"}>
                      <div className={"dashboard"}>
                          <div className={"dashboard-summary"}>
                              <div style={{display:"grid",gridTemplateColumns:"50% 50%"}}>
                                  <div>
                                      <h2>Total Insurance</h2>
                                      <h3>{numInsure}</h3>
                                  </div>
                                  <div>
                                      <h2>Total Revenue</h2>
                                      <h3>{paidInsure}</h3>
                                  </div>
                              </div>
                              <div style={{display:"grid",gridTemplateColumns:"50% 50%"}}>
                                  <div>
                                      <h2>Total Claim Cost</h2>
                                      <h3>{claimInsure}</h3>
                                  </div>
                                  <div>
                                      <h2>Total Claim Number</h2>
                                      <h3>{claimNum}</h3>
                                  </div>
                              </div>
                              <div>
                                  <h2>Insurance Sell List</h2>
                                  <div className="customer-db-third-customerorders-label-menu">
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>Customer ID</h3>
                                      </div>
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>Type</h3>
                                      </div>
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>Price</h3>
                                      </div>
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>Plate</h3>
                                      </div>
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>Province</h3>
                                      </div>
                                      <div className="customer-db-third-customerorders-label-menu-cont">
                                          <h3>End Date</h3>
                                      </div>
                                  </div>
                                  <div className="customer-db-third-customerorders-detail-cont">
                                      {list}
                                  </div>
                              </div>
                          </div>
                          <h2>Car List</h2>
                          <div className="customer-db-third-customerorders-label-menu-car">
                              <div className="customer-db-third-customerorders-label-menu-cont">
                                  <h3>Car Model ID</h3>
                              </div>
                              <div className="customer-db-third-customerorders-label-menu-cont">
                                  <h3>Year</h3>
                              </div>
                              <div className="customer-db-third-customerorders-label-menu-cont">
                                  <h3>Brand</h3>
                              </div>
                              <div className="customer-db-third-customerorders-label-menu-cont">
                                  <h3>Model</h3>
                              </div>
                          </div>
                          <div className="customer-db-third-customerorders-detail-cont-car" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                              {listCar}
                          </div>
                      </div>
                  </div>
              </div>:<></>}
              {select==1?<div>
                  <h1>Add Car and Insurance</h1>
                  <div  style={{width:"80vw",marginLeft:"10vw",display:"grid",gridTemplateColumns:"50% 50%"}}>
                      <div>
                      <h3>Car Data</h3>
                        <p>Add Car Brand</p>
                        <input type={"text"} onChange={(e)=>setAddCarBrand(e.target.value)}/>
                      <p>Add Car Model</p>
                      <input type={"text"} onChange={(e)=>setAddCarModel(e.target.value)}/>
                      <p>Add Car Year</p>
                      <input type={"text"} onChange={(e)=>setAddCarYear(e.target.value)}/>
                      </div>
                      <div>
                      <h3>Price Data</h3>
                      <p>Add Type 1 Insurance Price</p>
                      <input type={"text"} onChange={(e)=>setAddCarType1(e.target.value)}/>
                      <p>Add Type 2 Insurance Price</p>
                      <input type={"text"} onChange={(e)=>setAddCarType2(e.target.value)}/>
                      <p>Add Type 3 Insurance Price</p>
                      <input type={"text"} onChange={(e)=>setAddCarType3(e.target.value)}/>
                      </div>
                  </div>
                  <br/>
                  <button onClick={addCar}>ADD Car Model</button>
              </div>:<></>}
              {select==2?<div>
                  <h1>Edit Insurance</h1>
                    <h3>Car Model ID</h3>
                  <input type={"text"} placeholder={"Insert Insurance ID"} onChange={e=>setEditId(e.target.value)}/>
                  <div  style={{width:"80vw",marginLeft:"10vw",display:"grid",gridTemplateColumns:"50% 50%"}}>
                      <div>
                          <h3>Car Data</h3>
                          <p>Edit Car Brand</p>
                          <input type={"text"} onChange={(e)=>seteditCarBrand(e.target.value)} value={editCarBrand}/>
                          <p>Edit Car Model</p>
                          <input type={"text"} onChange={(e)=>seteditCarModel(e.target.value)} value={editCarModel}/>
                          <p>Edit Car Year</p>
                          <input type={"text"} onChange={(e)=>seteditCarYear(e.target.value)} value={editCarYear}/>
                      </div>
                      <div>
                          <h3>Price Data</h3>
                          <p>Edit Type 1 Insurance Price</p>
                          <input type={"text"} onChange={(e)=>seteditCarType1(e.target.value)} value={editCarType1}/>
                          <p>Edit Type 2 Insurance Price</p>
                          <input type={"text"} onChange={(e)=>seteditCarType2(e.target.value)} value={editCarType2}/>
                          <p>Edit Type 3 Insurance Price</p>
                          <input type={"text"} onChange={(e)=>seteditCarType3(e.target.value)} value={editCarType3}/>
                      </div>
                  </div>
                  <br/>
                  <button onClick={editCar}>Edit Car Model</button>

              </div>:<></>}
              {select==3?<div>
                    <h1>Add Customer Claim</h1>
                  <p>Insurance Id</p>
                  <input type={"text"} onChange={e=>setClaimId(e.target.value)}/>
                  <p>Claim Price</p>
                  <input type={"text"} onChange={e=>setClaim(e.target.value)}/><br/><br/>
                  <button onClick={()=>{
                  axios.post("http://localhost:3010/admin/claim",{
                      id:claimId,
                      price:claim
                  }).then(e=>{
                      alert("Add Claim")
                  }).catch(e=>{
                      console.log(e)
                      alert("Error")
                  })
                  }
                  }>ADD CLAIM</button>
              </div>:<></>}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
