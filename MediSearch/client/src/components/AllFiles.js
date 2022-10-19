import React, { useState, useEffect, useContext } from 'react';
import download from 'downloadjs';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
import { confirm } from "react-confirm-box";
import { UserContext } from "../App";
import Card from "react-bootstrap/Card";
import {Modal} from "react-bootstrap";

const FilesList = () => {

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [select, setSelect] = useState("");

  const {state, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:1})

  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState('');
  const [newArea, setNewArea] = useState('');

  const [modalShow2, setModalShow2] = useState(false);

  const [phFeed, setPhFeed] = useState('');
  const [phm, setPhm] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8040/pres/get/${localStorage.getItem("sid")}`);
        setErrorMsg('');
        setFilesList(data.dat);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8040/pres/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const deleteFile = async (id) => {
    console.log(id);

    const result1 = await confirm("Are you sure do you want to delete?");
    
    if (result1) {
      const result2 = await confirm("This file wil be permenantly deleted!!!");
      if(result2){
        axios.delete(`http://localhost:8040/pres/delete/${id}`).then((res) => {
            alert("Deleted");
            window.location.reload(false);
        }).catch((err) => {
            alert(err);
        });
      
      }
      
    }
  };

  const passValues = (id) => {
    setId(id);

    setModalShow(true);
  }

  const passValues2 = (feed, phm) => {
    setPhFeed(feed);
    setPhm(phm);
    setModalShow2(true);
  }

  const updateArea = async () => {
    var area = document.getElementById("narea").value;

    const message = {
      area
    }

    axios.put(`http://localhost:8040/pres/editArea/${id}`, message).then((res) => {
        alert(res.data);
        window.location.reload(false);
    }).catch((err) => {
        alert(err);
    })

  }

  const navigateShop = async () => {
    window.location.assign(`/shopproducts/${phm}`);
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
            Change Area
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form class="d-flex" onSubmit={() => updateArea()}>
            
        <select class="form-select" id="narea" aria-label="Default select example" style={{backgroundColor : 'transparent' ,borderColor : 'black', width:'45rem' }} required>
        <option selected></option>
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
        <button class="btn btn-success" type="submit">
          Done
        </button>
        </form>
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
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
            Feedbacks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{phFeed} &nbsp;
          {phm ? (
          <button type="button" className="btn btn-primary mt-2" 
          onClick={() => navigateShop()}
          >View Shop</button>
          ):(
            <></>
          )}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="container" align='center'>
      <br/><br/>
      <h1>Submitted Prescription List</h1>
      <div align='right' style={{width:'80rem'}}>
          <input type='text' placeholder='Search Area' style={{width:'15rem', borderColor:'transparent'}}
          onChange={(e) => {
              setSelect(e.target.value);
          }}
          required />&nbsp;
      </div>
        <div align='cenetr'>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        <MyVerticallyCenteredModal2
            show={modalShow2}
            onHide={() => setModalShow2(false)}
        />
        <div style={{backgroundColor:'transparent', width:'95%'}} >
        <br/><br/>
            <a href='/presUpload' ><button type="button" class="btn btn-success">Upload New Prescription</button></a>
            <br/><br/>
        </div>
        <br/><br/>
        </div>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="row">
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, feedback, file_path, file_mimetype, area, pharmacist }) => {
                if(select === ""){
                return(
                <div className="col-4" align="center" key={_id}>
                    <Card style={{ width: '15rem', backgroundColor: 'transparent' }}>
                    <Card.Body>
                        <Card.Text>
                        <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFW6qa0mtd1Q1jYqXwooAQCT3wboD5WSR6Q&usqp=CAU" alt="Card image" />
                        </Card.Text>
                        &nbsp;
                        <p>View Area : 
                        <Link to=''>
                        <a style={{color:'blue', paddingRight: '10px'}}
                            onClick={() => {passValues(_id)}}
                        >
                        {area}
                        </a></Link>
                        </p>
                        <button type="button" className="btn btn-primary" style={{width: '13rem'}} onClick={() => downloadFile(_id, file_path, file_mimetype)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>&nbsp;&nbsp;&nbsp;Download File
                        </button>
                        &nbsp;
                        {feedback ? (
                        <button type="button" className="btn btn-success" style={{width: '13rem'}}
                        onClick={() => {passValues2(feedback, pharmacist)}}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                        </svg>&nbsp;&nbsp;&nbsp;Check Feedback
                        </button>
                        ):(
                          <>
                          <p>No feedbacks yet</p>
                          </>
                        )}
                        <button type="button" className="btn btn-danger mt-2" style={{width: '3rem'}} onClick={() => deleteFile(_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                        </button>
                    </Card.Body>
                    </Card><br/><br/><br/>
                </div>
                )
                }else if(area.toLowerCase().includes(select.toLowerCase())){
                  return(
                    <div className="col-4" align="center" key={_id}>
                        <Card style={{ width: '15rem', backgroundColor: 'transparent' }}>
                        <Card.Body>
                            <Card.Text>
                            <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFW6qa0mtd1Q1jYqXwooAQCT3wboD5WSR6Q&usqp=CAU" alt="Card image" />
                            </Card.Text>
                            &nbsp;
                            <p>View Area : 
                            <Link to=''>
                            <a style={{color:'blue', paddingRight: '10px'}}
                                onClick={() => {passValues(_id)}}
                            >
                            {area}
                            </a></Link>
                            </p>
                            <button type="button" className="btn btn-primary" style={{width: '13rem'}} onClick={() => downloadFile(_id, file_path, file_mimetype)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            </svg>&nbsp;&nbsp;&nbsp;Download File
                            </button>
                            &nbsp;
                            {feedback ? (
                            <button type="button" className="btn btn-success" style={{width: '13rem'}}
                            onClick={() => {passValues2(feedback, pharmacist)}}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
                            </svg>&nbsp;&nbsp;&nbsp;Check Feedback
                            </button>
                            ):(
                              <>
                              <p>No feedbacks yet</p>
                              </>
                            )}
                            <button type="button" className="btn btn-danger mt-2" style={{width: '3rem'}} onClick={() => deleteFile(_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                            </button>
                        </Card.Body>
                        </Card><br/><br/><br/>
                    </div>
                    )
                }
              }
            )
          ) : (
            <p>No files found. Please add some.</p>
          )}
        </div>
    </div>
  );
};

export default FilesList;