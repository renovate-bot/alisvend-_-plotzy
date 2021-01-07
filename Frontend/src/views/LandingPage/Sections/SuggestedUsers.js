import React from "react";
import apiClient from '../../../api';
import { Typography } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";


export default function SuggestedUsers(props) {

  const [users, setUsers] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);


  React.useEffect(() => {
    fetchUsers();
    getFollowers();
  }, []);



  const fetchUsers = () => {
    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .post("/api/users")
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
        )
    }
  }

  const getFollowers = () => {

    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/getFollowers")
        .then((response) => {

          setFollowers(response.data);

        })
        .catch((error) => console.error(error))


    };

  }



  const [text, setText] = React.useState("Follow");
  const changeText = (text) => {

    setText(text);
  }

  return (

    <div style={{ marginLeft: '10px', marginRight : '10px' }}>
      <h4 style={{ backgroundColor: '#f50057', borderRadius:"10px", textAlign:"center" }}>Suggested Users</h4>
      {users.map((user) => {
        return (
          <div style={{ marginLeft: '10px', marginRight : '10px' }}>
            <div>
        <Typography variant="p">{user.username}</Typography>
        </div>
        <div >
          <Button onClick={() => {followUser(user.id);}} >{text}</Button><br /></div>
          </div>)
      })}


    </div>




  )


}