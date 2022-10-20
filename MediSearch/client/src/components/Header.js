import React,{useState, useContext} from "react";
import axios from "axios";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { confirm } from "react-confirm-box";

import { UserContext } from "../App";

function Header(){

    var sid = localStorage.getItem("sid");
    var sname = localStorage.getItem("sname");
    var semail = localStorage.getItem("semail");
    var snic = localStorage.getItem("snic");
    var saddress = localStorage.getItem("saddress");
    var smobile = localStorage.getItem("smobile");

    var aid = localStorage.getItem("aid");
    var aname = localStorage.getItem("aname");
    var aemail = localStorage.getItem("aemail");
    var anic = localStorage.getItem("anic");
    var amobile = localStorage.getItem("amobile");
    var aarea = localStorage.getItem("aarea");
    var ashop_address = localStorage.getItem("ashop_address");
    var ashop_location = localStorage.getItem("ashop_location");

    const {state, dispatch} = useContext(UserContext);

    const deleteCustomer = async () => {
        const result1 = await confirm("Are you sure do you want to delete your account?");
        if (result1) {
            const result2 = await confirm("Your account wil be permenantly deleted!!!");
            if(result2){
              axios.delete(`http://localhost:8060/customer/${sid}`).then((res) => {
                localStorage.setItem("sid", "");
                localStorage.setItem("sname", "");
                localStorage.setItem("semail", "");
                localStorage.setItem("snic", "");
                localStorage.setItem("saddress", "");
                localStorage.setItem("smobile", "");
                localStorage.setItem("spassword", "");
                alert(res.data);
              }).catch((err) => {
                  alert(err);
              });
              window.location.assign("/log");
            }
            
          }
    }

    const deleteFarmer = async () => {
        const result1 = await confirm("Are you sure do you want to delete your account?");
        if (result1) {
            const result2 = await confirm("Your account wil be permenantly deleted!!!");
            if(result2){
              axios.delete(`http://localhost:8040/pharmacist/${aid}`).then((res) => {
                localStorage.setItem("aid", "");
                localStorage.setItem("aname", "");
                localStorage.setItem("aemail", "");
                localStorage.setItem("anic", "");
                localStorage.setItem("aaddress", "");
                localStorage.setItem("amobile", "");
                localStorage.setItem("ashop_name", "");
                localStorage.setItem("ashop_address", "");
                localStorage.setItem("ashop_location", "");
                localStorage.setItem("apassword", "");
                alert(res.data);
              }).catch((err) => {
                  alert(err);
              });
              window.location.assign("/log");
            }
            
        }
    }

    function profile(){
        if(state == 1){
        return(
            <>
            <p className="fs-3">{sname}</p>
            <table style={{width: "100%"}}>
                <tr>
                    <td className="fs-7">NIC</td>
                    <td className="fs-7">{snic}</td>
                </tr>
                <tr>
                    <td className="fs-7">Email</td>
                    <td className="fs-7"><a href="">{semail}</a></td>
                </tr>
                <tr>
                    <td className="fs-7">Mobile</td>
                    <td className="fs-7">{smobile}</td>
                </tr>
                <tr>
                    <td className="fs-7">Address</td>
                    <td className="fs-7">{saddress}</td>
                </tr>
            </table>
            <br/>
            <Link to="/cusupdate">
            <button style={{width: "100%", opacity:"70%"}} type="button" className="btn btn-lg btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            &nbsp;&nbsp;
            Edit Account
            </button></Link><br/><br/>
            <button style={{width: "100%", opacity:"70%"}} type="button" className="btn btn-lg btn-danger" data-bs-dismiss="offcanvas" aria-label="Close" onClick={deleteCustomer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            &nbsp;&nbsp;Delete Account
            </button>
            </>
        )}
        else if(state == 2){
            return(
                <>
                <p className="fs-1">{aname}</p>
                <table style={{width: "100%"}}>
                    <tr>
                        <td className="fs-5">NIC</td>
                        <td className="fs-5">{anic}</td>
                    </tr>
                    <tr>
                        <td className="fs-5">Email</td>
                        <td className="fs-5"><a href="">{aemail}</a></td>
                    </tr>
                    <tr>
                        <td className="fs-5">Mobile</td>
                        <td className="fs-5">{amobile}</td>
                    </tr>
                    <tr>
                        <td className="fs-5">Area</td>
                        <td className="fs-5">{aarea}</td>
                    </tr>
                </table>
                <br/>
                <Link to="/farupdate">
                <button style={{width: "100%", opacity:"70%"}} type="button" className="btn btn-lg btn-primary" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                Edit Account
                </button></Link><br/><br/>
                <button style={{width: "100%", opacity:"70%"}} type="button" className="btn btn-lg btn-danger" data-bs-dismiss="offcanvas" aria-label="Close" onClick={deleteFarmer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                &nbsp;&nbsp;Delete Account
                </button>
                </>
            )}
    }

    const RenderMenu = () => {

        if(state == 1){
            return(
                <>
                    <td>
                        <Link to="/home" className="nav-link active" aria-current="page" style={{color: "black"}}>Home</Link>  
                    </td>
                    <td>
                        <Link to="/cart" className="nav-link" aria-current="page" style={{color: "black"}}>Pharmacies</Link>
                    </td>
                    <td>
                        <Link to="/clientchat" className="nav-link" aria-current="page" style={{color: "black"}}>Chat Help</Link>
                    </td>
                    <td>
                        <Link to="/pres" className="nav-link" aria-current="page" style={{color: "black"}}>Prescription Upload</Link>
                    </td>
                    <td>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{color: "black"}} width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </button>
                    </td>
                </>
            )
        }
        else if(state == 2){
            return(
                <>
                    <td>
                        <Link to="/farmerhome" className="nav-link active" aria-current="page" style={{color: "black"}}>Home</Link>  
                    </td>
                    <td>
                        <Link to="/additem" className="nav-link" aria-current="page" style={{color: "black"}}>Add Items</Link>
                    </td>
                    <td>
                        <Link to="/pharmacistchat" className="nav-link" aria-current="page" style={{color: "black"}}>Chat List</Link>
                    </td>
                    <td>
                        <Link to="/checkpres" className="nav-link" aria-current="page" style={{color: "black"}}>Prescriptions</Link>
                    </td>
                    <td>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{color: "black"}} width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </button>
                    </td>
                </>
            )
        }
        else{
            return(
                <>
                    <td>
                        <Link to="/" className="nav-link" aria-current="page" style={{color: "black"}}>Home</Link>
                    </td>
                    <td>
                        <Link to="/log" className="nav-link" aria-current="page" style={{color: "black"}}>Log In</Link>
                    </td>
                    <td>
                        <Link to="/reg" className="nav-link" aria-current="page" style={{color: "black"}}>Client Register</Link>
                    </td>
                    <td>
                        <Link to="/phreg" className="nav-link" aria-current="page" style={{color: "black"}}>Pharmacist Register</Link>
                    </td>
                </>
            )
        }
        
    }

    return(
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand">MediSearch</a>
                <table>
                    <tr>

                        <RenderMenu />
                        
                    </tr>
                </table>
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My Profile</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div align="center">
                    <img style={{width: "250px", opacity:"30%"}} src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"></img>
                    </div>
                    <hr/>
                    {profile()}
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;