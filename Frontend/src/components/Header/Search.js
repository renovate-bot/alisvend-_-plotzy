import { Typography } from "@material-ui/core";
import React from "react";
import apiClient from "../../api";
import NamesContainer from "./NamesContainer";
import TextField from '@material-ui/core/TextField';

export default function Search (props){



    const [names,setNames]=React.useState([]);
    const [searchTerm,setSearchTerm]=React.useState('');


    // React.useEffect(()=>{
    //    getNames();
    // },[])
    

    const getNames=(val)=>{

        if(val===""){setNames([]);}else{
            if (sessionStorage.getItem("loggedIn")) {
        
              apiClient
                .post("/api/users",{val:val})
                .then((response) => {
                    
                  setNames([]);
                  setNames(response.data);
        
                })
                .catch((error) => console.error(error))
        
            
          };}

    }

const editSearchTerm=(e)=>{
getNames(e.target.value);

    setSearchTerm(e.target.value);
}

const dynamicSearch=()=>{

const namess=names.map((name)=>{return name.username})
    return namess.filter(name=>name.toLowerCase().
    includes(searchTerm.toLowerCase()));


}




    return(




        <div>

<TextField id="outlined-basic" label="Search Users" variant="outlined" value={searchTerm} onChange={editSearchTerm} />

<br/>
<NamesContainer names={dynamicSearch()}/>

        </div>
    )
}