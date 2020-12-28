import { Typography } from "@material-ui/core";
import React from "react";
import apiClient from "../../api";
import Name from "./Name";




export default function NamesContainer(props){



    return (

        <div>

            {props.names.map(name=><Name name={name}/>)}
        </div> 
    )
}