import React,{useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { UserContext } from "../App";

function Login() {

    const navigate = useNavigate();

    const {state, dispatch} = useContext(UserContext);

    const [validated, setValidated] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [role, setRole] = useState();
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if(form.checkValidity()==true){
        event.preventDefault();
        event.stopPropagation();
        if(role === "Civilian"){
            cusNav();
        }
        if(role === "Pharmacist"){
            farNav();
        }
        
      }
      else{
        if (form.checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true); 
      }
      
    };

    const cusNav = () => {

        const validateCustomer = {
            password
        }

        axios.post(`http://localhost:8040/civilian/log/${email}`, validateCustomer).then((res)=>{
            if(res.data.status){

                localStorage.setItem("sid", res.data.Civilians._id);
                localStorage.setItem("sname", res.data.Civilians.name);
                localStorage.setItem("semail", res.data.Civilians.email);
                localStorage.setItem("snic", res.data.Civilians.nic);
                localStorage.setItem("saddress", res.data.Civilians.address);
                localStorage.setItem("smobile", res.data.Civilians.mobile);
                localStorage.setItem("spassword", res.data.Civilians.password);

                alert('loged successfuly');

                dispatch({type:"USER", payload:1})
                window.location.assign('/home');
            }
            else{
                alert('Invalid username or password')
            }
        }).catch((err)=>{
            alert(err);
        })
    }

    const farNav = () => {
        const validateAdmin1 = {
            password
        }

        axios.post(`http://localhost:8040/pharmacist/log/${email}`, validateAdmin1).then((res)=>{
            if(res.data.status){
                localStorage.setItem("aemail", email);

                localStorage.setItem("aid", res.data.Pharmacists._id);
                localStorage.setItem("aname", res.data.Pharmacists.name);
                localStorage.setItem("aemail", res.data.Pharmacists.email);
                localStorage.setItem("anic", res.data.Pharmacists.nic);
                localStorage.setItem("aaddress", res.data.Pharmacists.address);
                localStorage.setItem("amobile", res.data.Pharmacists.mobile);
                localStorage.setItem("apassword", res.data.Pharmacists.password);
                localStorage.setItem("aarea", res.data.Pharmacists.shop_district);

                alert('loged successfuly');

                dispatch({type:"USER", payload:2});
                window.location.assign('/farmerhome');
            }
            else{
                alert('Invalid username or password')
            }
        }).catch((err)=>{
            alert(err);
        })
    }

    return (
        <div className="container" align="center">
            <br/><br/><br/><br/><br/><br/>
            <Card style={{width:"30rem"}}>
            <Card.Body align="center">
                <Card.Title>Log In Form</Card.Title><br/>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                    <Form.Group as={Row} md="6" controlId="validationCustom04">
                        <Form.Label align="left">Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please enter your Email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="3" controlId="validationCustom05">
                        <Form.Label align="left" className='mt-3'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        required />
                        <Form.Control.Feedback type="invalid">
                        Please enter your Password
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="2" controlId="validationCustom04">
                        <Form.Label align="left" className='mt-3'>Role</Form.Label>
                        <select id="inputState" class="form-select"
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                        required>
                        <option selected></option>
                        <option>Civilian</option>
                        <option>Pharmacist</option>
                        </select>
                        <Form.Control.Feedback type="invalid">
                        Please select your Role
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <br/>
                    <Button type="submit" style={{width: '18rem'}}>Log In</Button> <br/><br/><a href="\reg">Did not have an account ?</a>
                </Form>
            </Card.Body>
            </Card>
        </div>
    );
}
  
export default Login;