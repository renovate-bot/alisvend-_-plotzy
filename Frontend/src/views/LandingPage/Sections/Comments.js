import React, { Component } from "react";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
import firebase from "firebase";
import { animateScroll } from "react-scroll";

class Comments extends Component {
    constructor(props) {
        super(props);
        var config = {
            apiKey: "AIzaSyBq4rB1eeYRAeqUDy1mfkDwRhotPSzUtGo",
            authDomain: "plotzy-6fce8.firebaseapp.com",
            databaseURL: "https://plotzy-6fce8-default-rtdb.firebaseio.com",
            projectId: "plotzy-6fce8",
            storageBucket: "plotzy-6fce8.appspot.com",
            messagingSenderId: "375408189253",
            appId: "1:375408189253:web:9fd748fdba080d5485682c",
            measurementId: "G-G9H81MW0CM"
        };
        this.state = {
            inpartyid: 0,
            conversations: []
        };
        this.handleComment = this.handleComment.bind(this);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }
    componentDidMount() {
        this.setState({ inpartyid: this.props.party_id})
    }
    getUserIdFromUrl() {
        let str = window.location.href;
        var user_id = str.substring(str.lastIndexOf("/") + 1, str.length);
        if (user_id && Number(user_id)) {
            this.addToCommentList(user_id);
        }
    }
    addToCommentList(user_id) {
    }
    handleComment(new_post_id) {
        this.setState({
            post_id: new_post_id
        });
    }
    scrolldown() {
        animateScroll.scrollToBottom({
            containerId: "message-list"
        });
    }
    render() {
        
        return (
            <div className="container" style={{padding: "0px"}}>
                <div className="columns">
                    <div className="column is-3"></div>
                    <div id='message-list' style={{overflowY:"scroll",  minHeight:'510px', maxHeight:"510px", scrollbarWidth: "thin",scrollbarColor:"#1e1e2e #27293d"}}>
                    <div className="column is-6">
                        <MessageList
                            db={firebase}
                            inpartyid={this.state.inpartyid}
                            scrolldown={this.scrolldown}
                        />
                        </div>
                    </div>
                </div>
                <div className="columns" style={{padding: "0px"}}>
                    <div className="column is-3"></div>
                    <div className="column is-3 "  style={{padding: "30px 0px"}}>
                        {this.state.inpartyid ? (
                            <MessageBox
                                db={firebase}
                                inpartyid={this.state.inpartyid}
                            />
                        ) : (
                                ""
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;
