import React,{useState, useEffect, useContext} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { confirm } from "react-confirm-box";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import {Modal} from "react-bootstrap";

import { UserContext } from "../App";

export default function GroupChat(){

    const {state, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload:1})

    const sid = localStorage.getItem("sid");
    const semail = localStorage.getItem("semail");

    const [msg, setMsg] = useState('');

    const [select, setSelect] = useState("");

    const [chatArr, setChat] = useState([]);

    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');

    const [access, setAccess] = useState("View to");
    
    useEffect(() => {
        function getChat(){
            axios.get(`http://localhost:8040/message/${sid}`).then((res) => {
                setChat(res.data);
            }).catch((err) => {
                alert(err);
            })
        }
        getChat();
    }, []);

    const sendMessage = () => {

        const sender = semail;
        const reciever = access;
        const message = msg;
        const grp = sid;
        const role = "client";
        const area = access;

        const newMessage = {
            sender,
            reciever,
            message,
            grp,
            role,
            area
        }

        axios.post("http://localhost:8040/message/", newMessage).then(() => {
            window.location.reload(false);
        }).catch((err) => {
            alert(err);
        });
    }

    const deleteMessage = async (id) => {

        const result = await confirm("Do you want to delete this message?");
        if (result) {
            axios.delete(`http://localhost:8040/message/${id}`).then((res) => {
                window.location.reload(false);
            }).catch((err) => {
                alert(err);
            });
        }
    }

    const updateMessage = async () => {

        var newMessage = document.getElementById("fdbk").value;

        const message = {
            newMessage
        }

        axios.put(`http://localhost:8040/message/${id}`, message).then((res) => {
            alert(res.data);
            window.location.reload(false);
        }).catch((err) => {
            alert(err);
        })

    }

    const navigateShop = async (email) => {
        window.location.assign(`/shopproducts/${email}`);
    }

    const passValues = (id, message) => {
        setId(id);
        setMessage(message);

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
              <Modal.Title>
                Edit Message
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form class="d-flex" onSubmit={() => updateMessage()}>
                <input class="form-control me-2" id="fdbk" type="search" placeholder="Enter a feedback" aria-label="Search" defaultValue={message} required />
                <button class="btn btn-success" type="submit">
                    Done
                </button>
            </form>
            </Modal.Body>
          </Modal>
        );
    }

    return(
        <>
        <br/><br/>
        <div align='center'>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <h1>Get Connected With Pharmacist</h1>
        <Card style={{ width: '80rem',borderColor: 'black'}}>
        <div align='right' style={{width:'80rem'}}>
            <input type='text' placeholder='Search Message' style={{width:'15rem', borderColor:'transparent'}}
            onChange={(e) => {
                setSelect(e.target.value);
            }}
            required />&nbsp;
        </div>
        <br/>
            <div className="scroll-bg" align='center' >
                <div className="scroll-div" style={{ height: '30rem'}}>
                    <div className="scroll-object" >
                    {/* #9ed2ff */}
                        {
                            chatArr.map((val, key) => {
                                if(select === ""){
                                return(
                                    <div style={{paddingTop: '10px'}}>
                                    {val.sender === semail ? (
                                        <div>
                                        <Card style={{ width: '25rem', backgroundColor: '#e4edf5', borderRadius:'10px' }}>
                                            <table style={{width:'100%'}}>
                                                <tr>
                                                    <td align="right">
                                                    <Link to=''>
                                                    <a style={{color:'red', paddingRight: '10px'}}
                                                        onClick={() => {deleteMessage(val._id)}}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg>
                                                    </a>
                                                    </Link>
                                                    <Link to=''>
                                                    <a style={{color:'blue', paddingRight: '10px'}}
                                                        onClick={() => {passValues(val._id, val.message)}}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </a>
                                                    </Link>
                                                    <p1 align='right' style={{fontSize:'10px', paddingRight: '10px'}}>{val.time}</p1>
                                                    </td>
                                                    <td align="left">
                                                        <p1 align='right' style={{fontSize:'10px', paddingLeft: '10px'}}>to {val.area}</p1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p1 style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px'}}>{val.message}</p1>
                                        </Card>
                                        </div>
                                    ):(
                                        <>
                                            <div align='left'>
                                            <Card style={{ width: '25rem', backgroundColor: '#6495ED', color:'black', borderRadius:'10px' }}>
                                                <table style={{width:'100%'}}>
                                                    <tr>
                                                        <td align="right">
                                                        <p1 align='right' style={{fontSize:'10px', paddingRight: '10px'}}>{val.time}</p1>
                                                        </td>
                                                        <td align="left">
                                                        <Link to=''>
                                                        <a style={{color:'white', paddingRight: '10px'}}
                                                            onClick={() => {navigateShop(val.sender)}}
                                                        >
                                                            {val.sender}
                                                        </a>
                                                        </Link>&nbsp;
                                                        </td>
                                                    </tr>
                                                </table>
                                                <p1 style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px'}}>{val.message}</p1>
                                            </Card>
                                            </div>
                                        </>
                                    )}
                                    </div>
                                )
                            }else if(val.message.toLowerCase().includes(select.toLowerCase())){
                                return(
                                    <div style={{paddingTop: '10px'}}>
                                    {val.sender === semail ? (
                                        <div>
                                        <Card style={{ width: '25rem', backgroundColor: '#e4edf5', borderRadius:'10px' }}>
                                            <table style={{width:'100%'}}>
                                                <tr>
                                                    <td align="right">
                                                    <Link to=''>
                                                    <a style={{color:'red', paddingRight: '10px'}}
                                                        onClick={() => {deleteMessage(val._id)}}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg>
                                                    </a>
                                                    </Link>
                                                    <Link to=''>
                                                    <a style={{color:'blue', paddingRight: '10px'}}
                                                        onClick={() => {passValues(val._id, val.message)}}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </a>
                                                    </Link>
                                                    <p1 align='right' style={{fontSize:'10px', paddingRight: '10px'}}>{val.time}</p1>
                                                    </td>
                                                    <td align="left">
                                                        <p1 align='right' style={{fontSize:'10px', paddingLeft: '10px'}}>to {val.area}</p1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <p1 style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px'}}>{val.message}</p1>
                                        </Card>
                                        </div>
                                    ):(
                                        <>
                                            <div align='left'>
                                            <Card style={{ width: '25rem', backgroundColor: '#6495ED', color:'black', borderRadius:'10px' }}>
                                                <table style={{width:'100%'}}>
                                                    <tr>
                                                        <td align="right">
                                                        <p1 align='right' style={{fontSize:'10px', paddingRight: '10px'}}>{val.time}</p1>
                                                        </td>
                                                        <td align="left">
                                                        <Link to=''>
                                                        <a style={{color:'white', paddingRight: '10px'}}
                                                            onClick={() => {navigateShop(val.sender)}}
                                                        >
                                                            {val.sender}
                                                        </a>
                                                        </Link>&nbsp;
                                                        </td>
                                                    </tr>
                                                </table>
                                                <p1 style={{paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px'}}>{val.message}</p1>
                                            </Card>
                                            </div>
                                        </>
                                    )}
                                    </div>
                                )
                            }
                            })
                        }
                    </div>
                </div>
                <div style={{padding: '20px', paddingLeft: '50px'}}>
                <table className="mt-3">
                    <tr>
                        <td>
                        <input type="text" className="form-control" placeholder="Enter a message" style={{backgroundColor : 'transparent' ,borderColor : 'black', width:'58rem' }}
                        onChange = {(e) => {
                            setMsg(e.target.value);
                        }}
                        />
                        </td>
                        <td>
                        <select class="form-select" aria-label="Default select example" style={{backgroundColor : 'transparent' ,borderColor : 'black', width:'10rem' }}
                        onChange={(e) => {
                            setAccess(e.target.value);
                        }}
                        >
                        <option selected>View to</option>
                        {/* <option value="All">All</option> */}
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
                        </td>
                        <td style={{paddingLeft: '20px'}}>
                        {msg && (access !== "View to") ? (
                            <>
                            <button type="button" className="btn btn-success rounded-circle"
                            onClick={() => {sendMessage()}}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>
                            </button>
                            </>
                        ):(
                            <></>
                        )}
                        </td>
                    </tr>
                </table>
                </div>
            </div>
        </Card>
        </div>
        <br/><br/><br/>
        </>
    )

}