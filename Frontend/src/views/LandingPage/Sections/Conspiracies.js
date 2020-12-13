import React from 'react';

import apiClient from '../../../api';

const Conspiracies = (props) => {

const [conspiracies, setConspiracies] = React.useState([]);

React.useEffect(() => {
 fetchConspiracies();
}, []);

const fetchConspiracies = () => {
    if (sessionStorage.getItem("loggedIn")) {
     
        apiClient
          .get("/api/conspiracies")
          .then((response) => {
            setConspiracies(response.data);
          })
          .catch((error) => console.error(error))
      
    }
  };

    return(

<div>{conspiracies.map((conspiracy)=>{return (<div key={conspiracy.id}> <h3 style={{color:'black'}}>{conspiracy.title}</h3><p style={{color:'black'}}>{conspiracy.content}</p></div>);})}</div>

    );

}

export default Conspiracies;
