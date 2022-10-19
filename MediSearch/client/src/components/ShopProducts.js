import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../App";
import {Card, Modal} from "react-bootstrap";
import { useParams } from 'react-router-dom';

const User = () => {
    const { email } = useParams();

    const details = {
        email
    }

    return details;
}

const ItemList = () => {

  var semail = localStorage.getItem("semail");

  const shopdata = User();
  const {state1, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:1})

  const [ItemList, setItemList] = useState([]);
  const [Shop, setShop] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [fName, setFName] = useState("");
  const [image, setimage] = useState("");
  const [type, settype] = useState("");
  const [fEmail, setfEmail] = useState("");
  const [price, setprice] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");

  const [select, setSelect] = useState("");

  useEffect(() => {
    const getItemList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8040/item/getbyemail/${shopdata.email}`);

        setItemList(data);
      } catch (error) {
        alert(error);
      }
    };
    const getShop = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8040/pharmacist/getbyemail/${shopdata.email}`);
  
          setShop(data);
        } catch (error) {
          alert(error);
        }
    };
    getShop();
    getItemList();
    
  }, []);

  function setData(name, image, type, farmerEmail, farmerName, price, desc){

    setFName(farmerName)
    setfEmail(farmerEmail)
    setprice(price)
    setname(name)
    setdesc(desc)
    settype(type)
    setimage(image)

    setModalShow(true);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        align='center'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{ width: '25rem'}}>
          <Card.Img variant="top" src={image}/>
          </Card>
          <h4 style={{color:'red'}}>Price = Rs.{price}</h4>
          <p>{desc}</p>
          <p>Pharmacist Name : {fName}</p>
          <p>Pharmacist Email : <a href=''>{fEmail}</a></p>
          <br/>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
    <br/><br/>
    <div style={{backgroundColor:'whitesmoke'}} >
    {
          Shop.map(({ _id, name, email, nic, mobile, shop_name, shop_address, shop_location, password }) => {
            return(
            <div key={_id} className="ms-5">
                <p class="fs-1">{shop_name}</p>
                <p class="fs-5">Address :  {shop_address}</p>
                <p class="fs-5">Tel no. :  {mobile}</p>
                <p class="fs-5">Pharmacist :  {name} | {email} | {nic} </p>
                <a href={shop_location}>
                    <button type="button" class="btn btn-primary">Locate &nbsp;&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    </button>
                </a>
            </div>
            )
          })
        }
        <br/>
    </div>
    <div align='center'>
      <div align='right' style={{width:'80rem'}}>
      <br/>
          <input type='text' placeholder='Search Product' style={{width:'15rem'}}
          onChange={(e) => {
              setSelect(e.target.value);
          }}
          required />
      </div>
      <br/><br/>
    <div style={{background : 'transparent', width:"95%"}}>
    
        <div className="row">

        {ItemList.length > 0 ? (
          ItemList.map(({ _id, name, pharmasist_email, pharmasist_name, price, image, desc }) => {
            if(select === ""){
              return(
                <div className="col-3" align="center" key={_id}>
                    <Card style={{ width: '15rem', borderColor: 'black', borderRadius:"15px" }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Img variant="top" className='imageView' src={image} alt={name}/>
                    <Card.Body>
                        <Card.Title style={{color:"red"}}>Rs.{price}</Card.Title>
                    </Card.Body>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-success" style={{width: '12rem'}} onClick={() => setData(name, image, "" , pharmasist_email, pharmasist_name, price, desc)}>Show More</button>
                    </div>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <br/>
                    </Card><br/><br/><br/>
                </div>
              )
            }
            else if(name.toLowerCase().includes(select.toLowerCase())){
              return(
                <div className="col-3" align="center" key={_id}>
                    <Card style={{ width: '15rem', borderColor: 'black', borderRadius:"15px" }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Img variant="top" className='imageView' src={image} alt={name}/>
                    <Card.Body>
                        <Card.Title style={{color:"red"}}>Rs.{price}</Card.Title>
                    </Card.Body>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-success" style={{width: '12rem'}} onClick={() => setData(name, image, "" , pharmasist_email, pharmasist_name, price, desc)}>Show More</button>
                    </div>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <br/>
                    </Card><br/><br/><br/>
                </div>
              )
            }
          })
          ):(
            <div>
              <p class="fs-2">No products found!</p>
            </div>
          )
        }

           
        </div>
        </div>
    </div>
    </>
  );
};

export default ItemList;