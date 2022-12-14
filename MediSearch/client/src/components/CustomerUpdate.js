import React,{useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
import { UserContext } from "../App";


function CusUpdate() {

    const {state1, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload:1})

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const id = localStorage.getItem("sid");
    const [name, setName] = useState(localStorage.getItem("sname"));
    const [email, setEmail] = useState(localStorage.getItem("semail"));
    const [nic, setNic] = useState(localStorage.getItem("snic"));
    const [address, setAddress] = useState(localStorage.getItem("saddress"));
    const [mobile, setMobile] = useState(localStorage.getItem("smobile"));
    const [password, setPassword] = useState(localStorage.getItem("spassword"));
  
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

        const updateSudent = {
            name,
            email,
            nic,
            mobile,
            password
        }

        axios.put(`http://localhost:8040/civilian/${id}`, updateSudent).then((res)=>{
            alert(res.data.msg);
            if(res.data.status){
                localStorage.setItem("sid", id);
                localStorage.setItem("sname", updateSudent.name);
                localStorage.setItem("semail", updateSudent.email);
                localStorage.setItem("snic", updateSudent.nic);
                localStorage.setItem("smobile", updateSudent.mobile);
                localStorage.setItem("spassword", updateSudent.password);
                window.location.assign("/home");
            }
            
        }).catch((err)=>{
            alert(err);
        })
    }
  
    return (
        <>
        <br/><br/>
        <div className="container mt-5" style={{backgroundColor:'white'}} align='center'>
        <br/><br/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom04">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" placeholder="Full name" defaultValue={name} pattern="[a-zA-Z][a-zA-Z. ]{3,}"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid Name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" defaultValue={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid Email.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" placeholder="NIC" defaultValue={nic} pattern="[0-9]{9,12}"
                    onChange={(e) => {
                        setNic(e.target.value);
                    }}
                    required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid NIC.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control type="tel" placeholder="Mobile number" defaultValue={mobile} pattern="[0][0-9]{9}"
                    onChange={(e) => {
                        setMobile(e.target.value);
                    }}
                    required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid Mobile number (0XXXXXXXXX).
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" defaultValue={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid Password.
                    Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Button type="submit">Save changes</Button>&nbsp;&nbsp;
                <Button type="reset">Reset</Button>
            </Form>
            <br/><br/>
        </div>
        </>
    );
}
  
export default CusUpdate;