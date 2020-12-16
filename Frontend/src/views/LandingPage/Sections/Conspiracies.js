import React from 'react';

import apiClient from '../../../api';
import "./styles.css";

const Conspiracies = (props) => {

const [conspiracies, setConspiracies] = React.useState([]);

React.useEffect(() => {
 //fetchConspiracies();
 setConspiracies(props.consp)
console.log("asddsa",props.consp);
}, []);



// const fetchConspiracies = () => {
//     if (sessionStorage.getItem("loggedIn")) {
     
//         apiClient
//           .get("/api/conspiracies")
//           .then((response) => {
//             setConspiracies(response.data);
//           })
//           .catch((error) => console.error(error))
      
//     }
//   };

    return(
     
<></>

    );

}

export default Conspiracies;
