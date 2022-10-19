import React,{useState, useContext} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";

import { UserContext } from "../App";

function Landing() {

    const {state1, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload:0})

    return (
        <>
        <br/><br/><br/><br/><br/>
        <div align="center">
            <br/><br/><br/><br/><br/><br/><br/>
            <div class="d-grid gap-2 d-md-block">
            <Link to="/log"><button type="button" className="btn btn-primary">
                <p className="fs-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>&nbsp;
                    Click Here to Continue
                </p>
            </button></Link>
            </div><br/>
        <br/><br/><br/><br/>
        </div>
        </>
    );
}
  
export default Landing;