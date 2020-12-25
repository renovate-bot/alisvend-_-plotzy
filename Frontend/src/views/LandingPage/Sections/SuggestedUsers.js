import React from "react";
import apiClient from '../../../api';
import { Typography } from '@material-ui/core';
import { Button, TextField } from "@material-ui/core";


export default function SuggestedUsers(props){

const [users,setUsers]=React.useState([]);


React.useEffect(() => {
    fetchUsers();

  }, []);



const fetchUsers = () => {
    if (sessionStorage.getItem("loggedIn")) {

      apiClient
        .get("/api/users")
        .then((response) => {
          setUsers([]);
          setUsers(response.data);

        })
        .catch((error) => console.error(error))

    }
  };

  const followUser = (uid)=>{
    if (sessionStorage.getItem("loggedIn")) {
      
       
        apiClient
            .post("/api/addFollower",{
                requester_id:sessionStorage.getItem('userId'),
                requestee_id:uid      

            }

                

            )

        

    }
    



  }
  return (

<div>   
{users.map((user)=>{return(<Typography variant="p">{user.username}<Button onClick={() => followUser(user.id)}>Follow</Button><br/></Typography>)})}

    
</div>




  )


}