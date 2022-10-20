import React, { useState, useEffect, useContext } from 'react';
import download from 'downloadjs';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
import { confirm } from "react-confirm-box";
import { UserContext } from "../App";
import {Card, Modal} from "react-bootstrap";

const FilesList = () => {

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const [newArea, setNewArea] = useState('');
  const [updateArea, setUpdateArea] = useState('');

  const [modalShow2, setModalShow2] = useState(false);
  const [id2, setId2] = useState('');
  const [message, setMessage] = useState('');

  const [id, setId] = useState('');

  const [test, setTest] = useState('');

  const {state, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:2})

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8040/pres/getAll/${localStorage.getItem("aarea")}`);
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

  const deleteFeedback = async (id) => {

    const feedback = null;

    const pFeedback = {
      feedback
    }

    axios.put(`http://localhost:8040/pres/edit/${id}/`, pFeedback).then((res) => {
        alert(res.data);
        window.location.reload(false);
    }).catch((err) => {
        alert(err);
    })

  }

  const updateFeedback = async () => {

    var feedback = document.getElementById("feedbk").value;
    // alert(feed);

    const pFeedback = {
      feedback
    }

    axios.put(`http://localhost:8040/pres/edit/${id}/${localStorage.getItem("aemail")}`, pFeedback).then((res) => {
        alert(res.data);
        setNewArea('');
        window.location.reload(false);
    }).catch((err) => {
        alert(err);
    })

  }

  const updateMessage = async () => {

    var feedback = document.getElementById("pfeed").value;
    // alert(feed);

    const pFeedback = {
      feedback
    }

    axios.put(`http://localhost:8040/pres/edit/${id2}`, pFeedback).then((res) => {
        alert(res.data);
        setNewArea('');
        window.location.reload(false);
    }).catch((err) => {
        alert(err);
    })

  }

  const cancelUpdate2 = () => {
    setUpdateArea('');
  }

  const cancelUpdate = () => {
    setNewArea('');
  }
  
  const passValues = (id) => {
    setId(id);

    setNewArea(id);
  }

  const passValues2 = (id, message) => {
    setId2(id);
    setMessage(message);

    setUpdateArea(id);
  }

  return (
    <div className="container" align="center">
        <br/><br/>
        <h1>Pharmacy Prescriptions Gallery</h1>
        <br/>
        
        <br/>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="row">
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, sender, feedback, file_path, file_mimetype }) => (
                <div className="col-4" align="center" key={_id}>
                    <Card style={{ width: '15rem', backgroundColor: 'transparent' }}>
                    <Card.Body>
                        <Card.Text>
                        <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFW6qa0mtd1Q1jYqXwooAQCT3wboD5WSR6Q&usqp=CAU" alt="Card image" />
                        </Card.Text>
                        &nbsp;
                        <button type="button" className="btn btn-light" style={{width: '13rem'}} onClick={() => downloadFile(_id, file_path, file_mimetype)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>&nbsp;&nbsp;&nbsp;Download File
                        </button>&nbsp;
                        {feedback ? (
                          <>
                          <p>Feedback : {feedback}</p>
                          {updateArea === _id ? (
                            <>
                            <form onSubmit={() => updateMessage()}>
                            <textarea id="pfeed" name="w3review" rows="4" cols="25" defaultValue={message} />
                              {/* <input class="form-control me-2" id="pfeed" type="text" placeholder="Enter a feedback" aria-label="Search" defaultValue={message} required /> */}
                              <button class="btn btn-danger" type="button"
                              onClick={() => cancelUpdate2()}
                              >
                                  Cancel
                              </button>
                              &nbsp;
                              <button class="btn btn-success" type="submit">
                                  Save Changes
                              </button>
                            </form>
                            </>
                          ):(
                            <>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-primary"
                            onClick={() => passValues2(_id, feedback)}
                            >Edit Feedback</button>
                            <button type="button" class="btn btn-danger"
                            onClick={() => deleteFeedback(_id)}
                            >Delete</button>
                          </div>
                            </>
                          )}
                          </>
                        ):(
                          <>
                          {newArea === _id ? (
                          <form onSubmit={() => updateFeedback()}>
                          <textarea id="feedbk" name="w3review" rows="4" cols="25" />
                          {/* <input class="form-control me-2" id="feedbk" type="search" placeholder="Enter a feedback" aria-label="Search" required /> */}
                          <button class="btn btn-danger" type="button"
                          onClick={() => cancelUpdate()}
                          >
                            Cancel
                          </button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <button class="btn btn-success" type="submit">
                              Save
                          </button>
                          </form>
                          
                          ):(
                            <>
                              <button type="button" className="btn btn-success" style={{width: '13rem'}}
                              onClick={() => passValues(_id)}
                              >
                              Add Feedback
                              </button>
                            </>
                          )}
                          </>
                        )}
                    </Card.Body>
                    </Card><br/><br/><br/>
                </div>
              )
            )
          ) : (
            <p>No files found. Please add some.</p>
          )}
        </div>
    </div>
  );
};

export default FilesList;