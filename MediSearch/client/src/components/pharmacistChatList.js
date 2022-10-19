import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../App";
import { useNavigate, useParams } from 'react-router-dom';

const ItemList = () => {

  var semail = localStorage.getItem("semail");

  const {state1, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload:2})

  const [ItemList, setItemList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getItemList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8040/message/senders/${localStorage.getItem("aarea")}`);

        setItemList(data);
      } catch (error) {
        alert("Error");
      }
    };
    getItemList();
  }, []);

  const navigateChat = async (sender) => {

    const result = await axios.get(`http://localhost:8040/message/sender/email/${sender}`);
    navigate(`/PharmacistChat/${result.data}`);
  }

  return (
    <>
    <br/><br/>
    <div align='center'>
      <h1>Chat List</h1>
      <br/><br/>
    <div style={{background : 'transparent', width:"95%"}}>
    
        <div className="row">

        {ItemList.length > 0 ? (
          ItemList.map((sender) => {
            // if(area == localStorage.getItem("aarea")){
              return(
                <div>
                    <button type="button" class="btn btn-light" style={{width: '20rem'}}
                    onClick={() => {navigateChat(sender)}}
                    >{sender}</button><br/><br/>
                </div>
              )
            // }
          })
        ):(
          <div>
            <p class="fs-2">No Chats are Found!</p>
          </div>
        )
        }
        </div>
        </div>
    </div>
    </>
  );
};

export default ItemList;