import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../App";
import {Card, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ItemList = () => {

  var semail = localStorage.getItem("semail");

  const {state1, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:1})

  const [ItemList, setItemList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [fName, setFName] = useState("");
  const [image, setimage] = useState("");
  const [type, settype] = useState("");
  const [fEmail, setfEmail] = useState("");
  const [price, setprice] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");

  const [select, setSelect] = useState("");

  const navigate = useNavigate();

  function passValues(email){
    navigate(`/shopproducts/${email}`);
    }

  useEffect(() => {
    const getItemList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8040/item/");

        setItemList(data);
      } catch (error) {
        alert("Error");
      }
    };

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
          <button type="button" class="btn btn-dark" style={{width: '12rem'}}
          onClick={() => passValues(fEmail)}
          >View Shop</button>
          <br/>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
    <br/><br/>
    <div align='center'>
      <div align='right' style={{width:'80rem'}}>
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
            <p class="fs-2">Not found!</p>
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