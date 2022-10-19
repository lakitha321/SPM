import React, { useState, useRef, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const UploadArea = (props) => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage

  const [access, setAccess] = useState("");

  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  
  const {state, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:1})

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('sender', localStorage.getItem("sid"));
            formData.append('area', access);
    
            setErrorMsg('');
            await axios.post("http://localhost:8040/pres/upload/", formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((res)=>{
              alert(res.data);
              navigate('/pres');
            });
          } else {
            setErrorMsg('Please select a file to add.');
          }
      } catch (error) {
        //error.response && setErrorMsg(error.response.data);
      }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    console.log(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  return (
        <div className="container" align='center'><br/><br/>
        <h1>Prescription Upload</h1><br/><br/>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <br/>
        <select id="inputState" class="form-select" placeholder='Select Area'
        onChange={(e) => {
          setAccess(e.target.value);
        }}
        required>
        <option selected></option>
        {/* <option>All</option> */}
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
        <br/>
        <div className="upload-section">
        <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
            <div className="p-3 mb-2 bg-dark text-white" {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <div className='border border-primary'>
                    <br/> <br/>
                <p>Drag and drop a file OR click here to select a file</p>
                <p>(Maximum File Size : 10MB)</p>
                <br/>
                    {file && (
                    <div>
                        <strong>Selected file:</strong> {file.name}
                    </div>
                    )}
                    {previewSrc ? (
                        isPreviewAvailable ? (
                        <div className="w-50 p-3">
                            <img className='choosedImg' src={previewSrc} alt="Preview" />
                        </div>
                        ) : (
                        <div className="preview-message">
                            <p>No preview available for this file</p>
                        </div>
                        )
                    ) : (
                        <div className="preview-message">
                        <p></p>
                        </div>
                    )}
                </div>
            </div>
            )}
        </Dropzone>
        </div>
        <br/>
        <Button className="btn btn-success" type="submit">
          Upload
        </Button>
      </Form>
      </div>
  );
};

export default UploadArea;