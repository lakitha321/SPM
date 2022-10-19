import React,{useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { UserContext } from "../App";


function AddItem() {
    const {state1, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload:2})


    var aemail = localStorage.getItem("aemail");
    var aname = localStorage.getItem("aname");

    var iname = localStorage.getItem("itname");
    var iprice = localStorage.getItem("itprice");
    var idesc = localStorage.getItem("itdesc");
    var iimg = localStorage.getItem("itimage");
    var iid = localStorage.getItem("itId");

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState(iname);
    const [farmerEmail, setfarmerEmail] = useState(aemail);
    const [farmerName, setfarmerName] = useState(aname);
    const [price, setprice] = useState(iprice);
    const [image, setimage] = useState(iimg);
    const [desc, setdesc] = useState(idesc);
  
    const handleSubmit = (event) => {
        
      const form = event.currentTarget;
      if(form.checkValidity()==true){
        event.preventDefault();
        event.stopPropagation();
        sendData();
      }
      else{
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true); 
      }
      
    };

    const sendData = (e) => {

        const newItem = {
            name,
            farmerEmail,
            farmerName,
            price,
            image,
            desc
        }

        axios.put(`http://localhost:8040/item/${iid}`, newItem).then((res)=>{
            alert(res.data.msg);
            window.location.assign('/farmerhome');
        }).catch((err)=>{
            alert(err);
        })
    }
  
    return (
        <div className="container">
            <br/><br/>
            <Card style={{ width: '68rem'}}>
            <Card.Body>
                <Card.Title>Edit product</Card.Title><br/>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Product name</Form.Label>
                        <Form.Control type="text" placeholder="Product name" pattern="[a-zA-Z][a-zA-Z. ]{3,}"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        defaultValue={iname}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Your name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" value={aname}
                        onChange={(e) => {
                            setfarmerName(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="6" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Your email</Form.Label>
                        <Form.Control type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={aemail}
                        onChange={(e) => {
                            setfarmerEmail(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom03">
                        <Form.Label className='mt-3'>Price</Form.Label>
                        <Form.Control type="number" placeholder="price"
                        onChange={(e) => {
                            setprice(e.target.value);
                        }}
                        defaultValue={iprice}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Price.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Image URL</Form.Label>
                        <Form.Control type="tel" placeholder="image URL"
                        onChange={(e) => {
                            setimage(e.target.value);
                        }}
                        defaultValue={iimg}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid URL.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Image Preview</Form.Label>
                        <br/><img src={image} style={{width:"150px"}} />
                    </Form.Group>
                    <Form.Group as={Row} md="3" controlId="validationCustom05" className='mb-5'>
                        <Form.Label className='mt-3'>Description</Form.Label>
                        <Form.Control type="text" placeholder="description"
                        onChange={(e) => {
                            setdesc(e.target.value);
                        }}
                        defaultValue={idesc}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Button type="submit" style={{width: '18rem'}}>Save changes</Button>
                </Form>
            </Card.Body>
            </Card>
        </div>
    );
}
  
export default AddItem;