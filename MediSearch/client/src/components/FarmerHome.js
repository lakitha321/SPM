import React, { useState, useEffect, useContext } from 'react';
 import { UserContext } from "../App";
 import axios from 'axios';
import {Card, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { confirm } from "react-confirm-box";

const FilesList = () => {

  var aid = localStorage.getItem("aid");
  var aname = localStorage.getItem("aname");
  var aemail = localStorage.getItem("aemail");
  var anic = localStorage.getItem("anic");
  var amobile = localStorage.getItem("amobile");
  var aaddress = localStorage.getItem("aaddress");

  const [modalShow, setModalShow] = useState(false);
  const [desc, setdesc] = useState("");

  const navigate = useNavigate();

  const {state1, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:2})

  const [ItemList, setItemList] = useState([]);

  const deleteItem = async (id) => {
    const result1 = await confirm("Are you sure do you want to delete this item?");
    if (result1) {

      axios.delete(`http://localhost:8040/item/${id}`).then((res) => {
        alert(res.data);
        window.location.reload(false);
      }).catch((err) => {
          alert(err);
      });
        
    }
}

  useEffect(() => {
    const getItemList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8040/item/getbyemail/${aemail}`);

        setItemList(data);
      } catch (error) {
        alert("Error");
      }
    };

    getItemList();
  }, []);

  function sendData(id, name, image, type, farmerEmail, farmerName, price, desc){


    localStorage.setItem("itId", id);
    localStorage.setItem("itname", name);
    localStorage.setItem("itimage", image);
    localStorage.setItem("ittype", type);
    localStorage.setItem("itprice", price);
    localStorage.setItem("itdesc", desc);
    navigate(`/edititem`);
  }

  const name = localStorage.getItem("sname");

  function setData(desc){
    setdesc(desc);
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
            Product Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{desc}</p>
          <br/>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
    <div align='center'>
    <div style={{backgroundColor:'transparent', width:'95%'}} >
    <br/><br/>
        <a href='/additem' ><button type="button" class="btn btn-success">Add Items</button></a>
        <br/><br/>
        <div className="row">
        {
          ItemList.map(({ _id, name, type, farmerEmail, farmerName, price, image, desc }) => {
              return(
                <div className="col-3" align="center" key={_id}>
                    <Card style={{ width: '15rem', borderColor: 'black', borderRadius:"15px" }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Img variant="top" className='imageView' src={image} alt={name}/>
                    <Card.Body>
                        <Card.Title style={{color:"red"}}>Rs.{price}</Card.Title>
                        <p>{type}</p>
                        <p>{farmerEmail}</p>
                        <p>{farmerName}</p>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-success" style={{width: '12rem'}} onClick={() => setData(desc)}>Show More</button>
                    </div>
                    
                    </Card.Body>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-primary" style={{width: '5rem'}} 
                        onClick={() => sendData(_id, name, image, type, farmerEmail, farmerName, price, desc)}
                        >Edit</button>
                      <button type="button" class="btn btn-danger"
                        onClick={() => deleteItem(_id)}
                      >Delete
                      </button>
                    </div>
                    <br/>
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    </Card>
                    <br/><br/>
                </div>
              )
          
          })
        }
    </div>
    
    </div>
    <br/><br/><br/><br/>
    </div>
    </>
  );
};

export default FilesList;