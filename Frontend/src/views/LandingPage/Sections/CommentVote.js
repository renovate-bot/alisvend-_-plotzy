import { Button, TextField,Radio,RadioGroup, FormControlLabel} from "@material-ui/core";
import React from "react";
import firebase from '../../../firebase';

require('firebase/auth');
require('firebase/database');

export default function CommentVote(props) {
    const [selectedValue, setSelectedValue] = React.useState('');
    var [sumLikes,setSumLikes]=React.useState(0);
    var [sumDislikes,setSumDislikes]=React.useState(0);
    const [status,setStatus]=React.useState(false);
    const [id,setID]=React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleSubmit(event.target.value);
  };






    const handleSubmit = (e) => {
       

        if(status==false){
        firebase.database().ref('commentVotes').push({commentID:props.commentID,userId:sessionStorage.getItem('userId'),
        username:sessionStorage.getItem('username'),vote:e});
        
        }else{
           
        firebase.database().ref('commentVotes').child(id).update({
            vote:e});
        }
        
        
                

            
    }

    React.useEffect(()=>{
setSelectedValue("");
setSumDislikes(0);
setSumLikes(0);

        getVotes();
       
    },[props.commentID])


    const getVotes=()=>{


        firebase.database().ref('commentVotes').on('value',snapshot=>{

           let sumLikes=0;
           let sumDislikes=0;
           const votes=snapshot.val();
           const votesList=[];
          console.log("hii");
                      for(let id in votes){
               votesList.push({id,...votes[id]});
               
               if(props.commentID==votes[id].commentID){
                   
                setID(id);
                
                            if(sessionStorage.getItem('userId')==votes[id].userId){setSelectedValue(votes[id].vote)
                               
                            setStatus(true);
                            }else{setSelectedValue('');}
                            if(votes[id].vote=='a'){
                                sumLikes++;
                            }else if(votes[id].vote=='b'){
                                sumDislikes++;
                            }
                    }
                   
                    props.sendLikes(sumLikes);
                      setSumDislikes(sumDislikes);
                      setSumLikes(sumLikes); 
              
           }
        
        })
    }

    const removeVote=(a)=>{
        
        firebase.database().ref('commentVotes').child(id).remove();
        setStatus(false);
        setSelectedValue('');
        if(a==0){
            setSumLikes(sumLikes-1);
        }else{setSumDislikes(sumDislikes-1);}
    }

    return (

<div>
<RadioGroup row aria-label="position" name="position"  onChange={handleChange}>

<FormControlLabel
       
       checked={selectedValue==='a'?true:false}
        value="a"
        control={<Radio color="primary" />}
       onDoubleClick={()=>removeVote(0)}
        label={'Approves '+sumLikes}
        labelPlacement="end"
      />

<FormControlLabel
        
        checked={selectedValue==='b'?true:false}
        value="b"
        control={<Radio color="secondary" />}
        onDoubleClick={()=>removeVote(1)}
        label={'Disaproves '+sumDislikes}
        labelPlacement="end"
      />
      </RadioGroup>
     

</div>

    )


}