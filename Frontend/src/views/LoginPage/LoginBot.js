import React, { useEffect,useContext,Component,Context } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from "axios";


import { useStore } from "../../../src/globalState/Store";

function Review(props) {

 

  const [hashtag, setHashtag] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [conspiracy, setConspiracy] = React.useState('');
  const {state, dispatch} = useStore();

  useEffect(() => {
    const { steps } = props;
    const { hashtag, title, conspiracy } = steps;
    console.log(title,"title");

    setTitle(title);
    setConspiracy(conspiracy);
    setHashtag(hashtag);
    
  }, [state.confirm]);



 useEffect(() => {
    
  if(state.confirm){
    addConsp();
    dispatch({type: "toggle", message:"mmm"});
   
  }
  },[state.confirm]);

 

  const addConsp = () => {
    axios
      .post("/api/addConspiracyAnonymously", {
        title: title.value,
        content: conspiracy.value,
        hashtag_id: hashtag.value,
      })
      .catch((error) => console.error(error))
  }

  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Title:  </td>
          </tr>
          <tr><td>Conspiracy:   </td></tr>
        </tbody>
      </table>
      <br></br>
     
     
    </div>
  );

}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default function LoginBot(props) {
  
 

  const [hashtags, setHashtags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
 

 useEffect(() => {

    getHashtags();

  }, []);

  const insertOptions = () => {
    const option = [];
    hashtags.map((hashtag) => { option.push({ value: hashtag.id, label: hashtag.name, trigger: '3' }) })


    setOptions(option);

  }

useEffect(() => {
    insertOptions();

  }, [hashtags]);




  const getHashtags = () => {

    axios.get('/api/hashtags')
      .then(response => {

        setHashtags(response.data);

      })
      .catch(error => console.error(error)
      )


  }

 

  const check = options.length > 0;
  const {state, dispatch} = useStore();
  return (

    check > 0 ?
      <ChatBot
        steps={[

          {
            id: '1',
            message: 'Choose a hashtag to share your conspiracy anonymously now!',
            trigger: 'hashtag',
          },
          {
            id: 'hashtag',
            options: options,
            trigger: '3',

          },
          {

            id: '3',
            message: 'Write a title for your conspiracy',
            trigger: 'title',

          },
          {
            id: 'title',
            user: true,
            trigger: '4',
          },
          {

            id: '4',
            message: 'Write your conspiracy to be posted anonymously now!',
            trigger: 'conspiracy',
          },
          {
            id: 'conspiracy',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'confirm',
          },
          {
            id: 'confirm',
            message: 'Enter confirm to post your theory',
            trigger: '6',
          },
          {
            id: '6',
            user: true,
            validator: (confirm) => {
              if (confirm.toLowerCase()!=='confirm') {
                return 'Enter confirm to post you theory!';
              }
             
             dispatch({type: "toggle", message:"mmm"});
            
              return true;
            },
            trigger: 'end-message',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your theory was posted successfully! ',
            trigger:'1',
          },
          
        ]}
      /> : <></>
  );

}

