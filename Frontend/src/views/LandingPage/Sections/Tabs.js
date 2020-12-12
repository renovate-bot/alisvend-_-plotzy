import React, { useState } from "react";
import "./styles.css";
import apiClient from "../../../api.js";
import Hashtags from "./Hashtags";

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

export default function Tabs() {
    const [title, setTitle] = React.useState('');
    const [conspiracy, setConspiracy] = React.useState('');
    const [hashtag, setHashtag] = React.useState(null);


    const handleSubmitConspiracy = (e) => {

        if (sessionStorage.getItem("loggedIn")) {
            e.preventDefault();
            apiClient
                .post("/api/addConspiracy", {
                    title: title,
                    content: conspiracy,
                    hashtag_id: hashtag,
                })
                .catch((error) => console.error(error))
                
                e.target.reset();
               
        }
        
    }
    
    const handleChangeHashtagID = hashtag => {
        setHashtag(hashtag);
    }



    return (
        <div className="App">
            <h1>Tab Component Demo</h1>
            <h2>Start adding tabs to see some magic happen!</h2>
            <Tab>
                <div title="Cospiracy">
                    <form onSubmit={handleSubmitConspiracy}>
                        <input
                            type="text"
                            name="title"
                            className=""
                            placeholder="Title..."
                            onChange={e => setTitle(e.target.value)}
                            required
                        />

                        <textarea name="Conspiracy" placeholder="Enter Conspiracy here..." onChange={e => setConspiracy(e.target.value)}></textarea>
                        
                        <Hashtags onChangeHashtagID={handleChangeHashtagID} />
                        
                        <input type="file" />
                        
                        <button type="submit">Post</button>
                    </form>
                </div>


                <div title="Bet">
                    <button>Bet</button>
                </div>

            </Tab>
        </div>
    );
}