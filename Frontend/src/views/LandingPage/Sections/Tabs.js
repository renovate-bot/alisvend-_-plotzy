import React, { useState } from "react";
import "./styles.css";
import apiClient from "../../../api.js";
import Hashtags from "./Hashtags";

import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, Input, TextareaAutosize } from "@material-ui/core";
// import FormData from 'form-data'
import ImageUploader from 'react-images-upload';

const Tab = props => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = props.children[activeTabIndex];
    return (
        <div>
            <div className="tabs">
                {props.children.map((tab, i) => (
                    <button
                        className="tab-btn"
                        onClick={() => {
                            setActiveTabIndex(i);
                        }}
                        key={i}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className="tab-indicator-container">
                <div
                    className="tab-indicator"
                    style={{
                        width: 100 / props.children.length + "%",
                        transform: `translateX(${activeTabIndex * 100}%)`
                    }}
                />
            </div>
            <div className="tab-content">{activeTab.props.children}</div>
        </div>
    );
};

export default function Tabs(props) {
    const [title, setTitle] = React.useState('');
    const [conspiracy, setConspiracy] = React.useState('');
    const [hashtag, setHashtag] = React.useState(null);
    const [image, setImage] = React.useState('');
    const [conspiracies, setConspiracies] = React.useState([]);





    const handleImage = (file) => {
        setImage(file[0]);
    }

    const handleSubmitConspiracy = (e) => {

        if (sessionStorage.getItem("loggedIn")) {
            e.preventDefault();
            const fd = new FormData();
            fd.append('title', title);
            fd.append('content', conspiracy);
            fd.append('hashtag_id', hashtag);
            fd.append('path', image);
            apiClient
                .post("/api/addConspiracy",

                    fd

                ).then(()=>{props.onAddConsp()})
                .catch((error) => console.error(error))

            e.target.reset();

        }
        setConspiracies(props.conspiracies);


    }



    const handleChangeHashtagID = hashtag => {
        setHashtag(hashtag);
    }


    return (
        <div className="App">

            <Tab>
                <div title="Cospiracy">
                    <form onSubmit={handleSubmitConspiracy} >
                        <Input
                            type="text"
                            name="title"
                            className=""
                            placeholder="Title..."
                            onChange={e => setTitle(e.target.value)}
                            required
                        />

                        <TextareaAutosize name="Conspiracy" placeholder="Enter Conspiracy here..." onChange={e => setConspiracy(e.target.value)}/>

                        <Hashtags onChangeHashtagID={handleChangeHashtagID} />


                        <Input type="file" onChange={(e) => { handleImage(e.target.files) }}></Input>
                        <Button type="submit">Post</Button>
                    </form>
                </div>


                <div title="Bet">
                    <button>Bet</button>
                </div>

            </Tab>
        </div>
    );
}