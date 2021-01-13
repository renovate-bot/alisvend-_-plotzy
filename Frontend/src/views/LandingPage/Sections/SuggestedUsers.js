import React from "react";
import apiClient from '../../../api';
import { Avatar, Typography } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";
import { Col, Row, Table } from "react-bootstrap";


export default function SuggestedUsers(props) {

  const [users, setUsers] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);


  React.useEffect(() => {
    fetchUsers();
    
  }, []);



  const fetchUsers = () => {
    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .post("/api/getSuggested")
        .then((response) => {
          setUsers([]);
          setUsers(response.data);

        })
        .catch((error) => console.error(error))

    }
  };

  const followUser = (uid) => {
    if (sessionStorage.getItem("loggedIn")) {


      apiClient
        .post("/api/addFollower", {
          requester_id: sessionStorage.getItem('userId'),
          requestee_id: uid
        }
        ).then(()=>fetchUsers()).catch((error) => console.error(error))
    }
  }

 






  const [text, setText] = React.useState("Follow");
  const changeText = (text) => {

    setText(text);
  }

  return (

    <div style={{ marginLeft: '10px', marginRight : '10px' }}>
      <h4 style={{ backgroundColor: '#f50057', borderRadius:"10px", textAlign:"center",color:"white" }}>Suggested Users</h4>
      {users.map((user) => {
        return (

          <div style={{ marginLeft: '10px', marginRight : '10px', marginBottom:"10px",display:"flex",justifyContent:"space-between", alignItems:"center" }}>
            
              <Table style={{width:"100%"}}>
              <tr>
              <td >
              <Avatar>
                <img style={{width:"40px",height:"40px"}} src={user.profile_pic}/>
                
              </Avatar></td>
              <td >{user.username}</td>
       

      
              <td style={{float:"right"}}> <Button onClick={() => {followUser(user.id);}} >{text}</Button><br /></td></tr></Table>
          </div>
          )
      })}


    </div>




  )


}