import React,{useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { UserContext } from "../App";


function PharmacistRegister() {
    const {state1, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload:0});

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNic] = useState("");
    const [mobile, setMobile] = useState("");
    const [shop_name, setShop_name] = useState("");
    const [shop_district, setshop_district] = useState("");
    const [shop_location, setShop_location] = useState("");
    const [password, setPassword] = useState("");
  
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

        const newPharmacist = {
            name,
            email,
            nic,
            mobile,
            shop_name,
            shop_district,
            shop_location,
            password
        }

        axios.post("http://localhost:8040/pharmacist/", newPharmacist).then((res)=>{
            alert(res.data);
            navigate("/log");
        }).catch((err)=>{
            alert(err);
        })
        
    }
  
    return (
        <div className="container">
            <br/><br/>
            <Card>
            <Card.Body>
                <Card.Title>Pharmacist Registration Form</Card.Title><br/>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                    <Form.Group as={Row} md="5" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Name</Form.Label>
                        <Form.Control type="text" placeholder="Full name" pattern="[a-zA-Z][a-zA-Z. ]{3,}"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="6" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="11" controlId="validationCustom03">
                        <Form.Label className='mt-3'>Pharmacy name</Form.Label>
                        <Form.Control type="text" placeholder="Pharmacy name" pattern="[a-zA-Z][a-zA-Z. ]{3,}"
                        onChange={(e) => {
                            setShop_name(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Pharmacy name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label align="left" className='mt-3'>Select District</Form.Label>
                        <select id="inputState" class="form-select"
                        onChange={(e) => {
                            setshop_district(e.target.value);
                        }}
                        required>
                        <option selected></option>
                        <option>Colombo</option>
                        <option>Gampaha</option>
                        <option>Kalutara</option>
                        <option>Kandy</option>
                        <option>Matale</option>
                        <option>Nuwara Eliya</option>
                        <option>Galle</option>
                        <option>Matara</option>
                        <option>Hambantota</option>
                        <option>Jaffna</option>
                        <option>Kilinochchi</option>
                        <option>Mannar</option>
                        <option>Vavuniya</option>
                        <option>Mullaitivu</option>
                        <option>Batticaloa</option>
                        <option>Ampara</option>
                        <option>Trincomalee</option>
                        <option>Kurunegala</option>
                        <option>Puttalam</option>
                        <option>Anuradhapura</option>
                        <option>Polonnaruwa</option>
                        <option>Badulla</option>
                        <option>Moneragala</option>
                        <option>Ratnapura</option>
                        <option>Kegalle</option>
                        </select>
                        <Form.Control.Feedback type="invalid">
                        Please select your shop District
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="11" controlId="validationCustom03">
                        <Form.Label className='mt-3'>Pharmacy location link (google map)</Form.Label>
                        <Form.Control type="text" placeholder="Location link" pattern="[a-zA-Z0-9._+-/():, ]{10,}"
                        onChange={(e) => {
                            setShop_location(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid location link.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05" className='mb-5'>
                        <Form.Label className='mt-3'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Password.
                        Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label className='mt-3'>NIC</Form.Label>
                        <Form.Control type="text" placeholder="NIC" pattern="[0-9]{9,12}"
                        onChange={(e) => {
                            setNic(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid NIC.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label className='mt-3'>Mobile Number</Form.Label>
                        <Form.Control type="tel" placeholder="Mobile number" pattern="[0][0-9]{9}"
                        onChange={(e) => {
                            setMobile(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid Mobile number (0XXXXXXXXX).
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Button type="submit" style={{width: '18rem'}}>Register</Button> &nbsp;&nbsp;&nbsp; <a href="\log">Already have an account ?</a>
                </Form>
            </Card.Body>
            </Card>
        </div>
    );
}
  
export default PharmacistRegister;