import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from "axios";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashtag: null,
      title: '',
      conspiracy: '',

    };
  }

  addConsp = () => {

    axios
      .post("/api/addConspiracyAnonymously", {
        title: this.props.steps.title.value,
        content: this.props.steps.content.value,
        hashtag_id: this.props.steps.hashtag.value,
      })
      .catch((error) => console.error(error))

  }

  componentDidMount() {

    const { steps } = this.props;
    const { hashtag, title, conspiracy } = steps;

    this.setState({ hashtag, title, conspiracy });
    console.log(this.state);
    //this.addConsp();
  
  }

  render() {
    const { hashtag, title, conspiracy } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>

              <td>{title.value} </td>

            </tr>

            <tr><td>{conspiracy.value}  </td></tr>
           

          </tbody>
        </table>
      </div>
    );
  }
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
  React.useEffect(() => {

    getHashtags();

  }, []);

  const insertOptions = () => {
    const option = [];
    hashtags.map((hashtag) => { option.push({ value: hashtag.id, label: hashtag.name, trigger: '3' }) })


    setOptions(option);

  }

  React.useEffect(() => {
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
            trigger: 'end-message',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your theory was posted successfully!',
            end: true,
          },
        ]}
      /> : <></>
  );

}

