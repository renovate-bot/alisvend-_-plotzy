import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from "axios";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashtag: '',
      title:'',
      conspiracy: '',
      hashtags:this.props.hashtags,
    };
  }

  
  componentWillMount() {
    const { steps } = this.props;
    const { hashtag, title,conspiracy,hashtags} = steps;
    //const {hashtags}=this.state;
    this.setState({ hashtag, title,conspiracy });

  }



  render() {
    const { hashtag, title,conspiracy,hashtags} = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>

              <td>{title.value} </td>
             
            </tr>

            <tr><td>{conspiracy.value}  </td></tr>
              <tr><td>{hashtag.value}</td></tr>

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

class LoginBot extends Component {
  render() {
    return (
      <ChatBot
        steps={[

          {
            id: 'hashtag',
            message: 'Choose a hashtag to share your conspiracy anonymously now!',
            trigger: '2',
          },
          {
            id: '2',
            options: [
              { value: 'politics', label: 'Politics', trigger: '3' },
              { value: 'health', label: 'Health', trigger: '3' },
              { value: 'sports', label: 'Sports', trigger: '3' },
              { value: 'series', label: 'Series', trigger: '3' },
              { value: 'social', label: 'Social', trigger: '3' },
              { value: 'tech', label: 'Tech', trigger: '3' },
            ],
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
      />
    );
  }
}

export default LoginBot;