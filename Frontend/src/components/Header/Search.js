import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
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

var useStyle = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: props.marginBottom ? props.marginBottom : '20px',
        '& .label.Mui-focused': {
          color: "white"
        },
        '& label': {
          color: "white"
        },
        '& .MuiInputBase-root': {
          color:"white",
          
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${"white"}`
        },
        '& .MuiInput-underline:hover:before': {
          borderBottom: `1px solid ${"white"}`
        },
        '& .MuiInput-underline:after': {
          borderBottom: `1px solid ${"white"}`
        },
        '& label.Mui-focused': {
          color: "white"
        },
        '& .MuiOutlinedInput-root': {
          color: "white",
          '& fieldset': {
            borderColor: "white"
          },
          '&:hover fieldset': {
            borderColor: "white"
          },
          '&.Mui-focused fieldset': {
            borderColor: "white"
          },
          '&.Mui-disabled fieldset': {
            borderRadius: '5px',
            borderColor: !!props.readOnly ? 'white' : 'inherit'
          }
        }
      },
      helperText: {
        color: "white"
      }
    ,
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        color: "white !important"
    }


}));




    return(
       


        <div>

<TextField classes={{root:useStyle.root}} id="outlined-search" value={searchTerm} style={{ margin: "auto", width: '100%', color: 'white !important' }} label="Enter Username" variant="outlined" onChange={editSearchTerm} />

<br/>
<NamesContainer names={dynamicSearch()}/>

        </div>
    )
}