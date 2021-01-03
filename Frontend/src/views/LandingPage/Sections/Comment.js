import { Button, TextField } from "@material-ui/core";
import React from "react";
import firebase from '../../../firebase';
import CommentVote from "./CommentVote";
import Vote from "./Vote";
//var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default function Comment(props) {
    const [comment, setComment] = React.useState('');
    const [commentsList,setCommentsList]=React.useState([]);
    const likes=[];
    

    const handleSubmit = () => {


        
        firebase.database().ref('comments').push({postID:props.postID,userId:sessionStorage.getItem('userId'),
        username:sessionStorage.getItem('username'),comment:comment});
        setComment("");
    

    }

    React.useEffect(()=>{
        getComments();
        
        //console.log(commentsList);
    },[])
    


    const getComments=()=>{


        firebase.database().ref('comments').on('value',snapshot=>{

            let commentsList=[];
           
                let votes=snapshot.val();
            for(let id in votes){
                if(props.postID==votes[id].postID){


                commentsList.push({id,...votes[id]});
            } }
            setCommentsList(commentsList);
        })
    }



        return (

            <div>

                <TextField
                    id="comment"
                    label="Comment"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={e => setComment(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}

                >
                    Post
                </Button >

{commentsList.map((comment)=>{return(
    <>
<p>{comment.username}: {comment.comment}</p>
<CommentVote  sendLikes={(e)=>{likes.push(e)}} commentID={comment.id}/>
</>
)})}

            </div>







        )

    }
