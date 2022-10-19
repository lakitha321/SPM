import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../App";
import {Card, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const PharmacyList = () => {

  var semail = localStorage.getItem("semail");

  const navigate = useNavigate();

  const {state1, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:1})

  const [ItemList, setItemList] = useState([]);

  const [select, setSelect] = useState("");

  function passValues(email){
    navigate(`/shopproducts/${email}`);
    }

  useEffect(() => {
    const getItemList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8040/pharmacist/");

        setItemList(data);
      } catch (error) {
        alert("Error");
      }
    };

    getItemList();
  }, []);


  return (
    <>
    <br/><br/>
    <div align='center'>

      <h1>Available Pharmacies</h1>

      <div align='right' style={{width:'85rem'}}>
          <input type='text' placeholder='Search' style={{width:'15rem'}}
          onChange={(e) => {
              setSelect(e.target.value);
          }}
          required />
      </div>
      <br/><br/>
    <div style={{background : 'transparent', width:"95%"}}>
    
        <div className="row">

        {
          ItemList.map(({ _id, name, email, nic, mobile, shop_name, shop_district, shop_location }) => {
            if(select === ""){
              return(
                <div className="col-6" align="center" key={_id}>
                    <Card style={{ width: '40rem', borderColor: 'black', borderRadius:"15px" }}>
                        <br/>
                    <Card.Title>{shop_name}</Card.Title>
                    <Card.Body>
                        <p>Shop District :   {shop_district}</p>
                        <p>Phone no     :   {mobile}</p>
                        <p>Email address :   {email}</p>
                        <p>Pharmacist :   {name}</p>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <a href={shop_location}>
                            <button type="button" class="btn btn-primary">Locate &nbsp;&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                            </button>
                        </a>
                        &nbsp;&nbsp;
                        <button type="button" class="btn btn-success"
                        onClick={() => passValues(email)}
                        >View Products</button>
                        </div>
                    </Card.Body>
                    </Card><br/><br/>
                </div>
              )
            }
            else if(shop_name.toLowerCase().includes(select.toLowerCase())){
              return(
                <div className="col-6" align="center" key={_id}>
                    <Card style={{ width: '40rem', borderColor: 'black', borderRadius:"15px" }}>
                        <br/>
                    <Card.Title>{shop_name}</Card.Title>
                    <Card.Body>
                        <p>Shop District :   {shop_district}</p>
                        <p>Phone no     :   {mobile}</p>
                        <p>Email address :   {email}</p>
                        <p>Pharmacist :   {name}</p>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <a href={shop_location}>
                            <button type="button" class="btn btn-primary">Locate &nbsp;&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                            </button>
                        </a>
                        &nbsp;&nbsp;
                        <button type="button" class="btn btn-success">View products</button>
                        </div>
                    </Card.Body>
                    </Card><br/><br/>
                </div>
              )
            }
          })
        }

           
        </div>
        </div>
    </div>
    </>
  );
};

export default PharmacyList;